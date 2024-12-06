#include "TStatesMachine.hpp"

TStatesMachine::TStatesMachine(TScreen *pScreen)
    {
    screen = pScreen;

    partage = TPartage::getInstance();

    tabStates[STX]   = &TStatesMachine::stx;
    tabStates[ETAT_A] = &TStatesMachine::etatA;
    tabStates[ETAT_B] = &TStatesMachine::etatB;
    tabStates[ETAT_C] = &TStatesMachine::etatC;
    tabStates[POIDS] = &TStatesMachine::poids;
    tabStates[TARE] = &TStatesMachine::tare;
    tabStates[CR] = &TStatesMachine::cr;
    tabStates[CKSM] = &TStatesMachine::cksm;

    total = 0;

    state = STX;
    }

TStatesMachine::~TStatesMachine()
    {
    }

void TStatesMachine::run(unsigned char data)
    {
    state = (this->*tabStates[state])(data);
    }

TStatesMachine::states_t TStatesMachine::stx(unsigned char data){
    total = data;
    if(data == 0x02)
        state = ETAT_A;
    return state;
}

TStatesMachine::states_t TStatesMachine::etatA(unsigned char data){
    total += data;
    etatA_d = data;
    state = ETAT_B;
    return state;
}

TStatesMachine::states_t TStatesMachine::etatB(unsigned char data){
    total += data;
    etatB_d = data;
    state = ETAT_C;
    return state;
}

TStatesMachine::states_t TStatesMachine::etatC(unsigned char data){
    total += data;
    poids_d.clear();
    tare_d.clear();
    state = POIDS;
    return state;
}

TStatesMachine::states_t TStatesMachine::poids(unsigned char data){
    total += data;
    if(!((data >= 0x30 && data <= 0x39) || data == 0x20)){
        state = STX;
        return state;
    }
    poids_d += static_cast<char>(data);
    if(poids_d.size()==6)
        state = TARE;
    return state;
}

TStatesMachine::states_t TStatesMachine::tare(unsigned char data){
    total += data;
    if(!((data >= 0x30 && data <= 0x39) || data == 0x20)){
        state = STX;
        return state;
    }
    tare_d += static_cast<char>(data);
    if(tare_d.size()==6)
        state = CR;
    return state;
}

TStatesMachine::states_t TStatesMachine::cr(unsigned char data){
    total += data;
    (data == 0x0D) ? state = CKSM : state = STX;
    return state;
}

TStatesMachine::states_t TStatesMachine::cksm(unsigned char data){
    if(((data + total) & 0x7F)==0)
        analyse();
    state = STX;
    return state;
}

void TStatesMachine::analyse(void){
    if(!(etatB_d & 0x0E)){
        switch (etatA_d & 0x07)
        {
        case 3:
            poids_d.insert(5,".");
            tare_d.insert(5,".");
            break;
        
        case 4:
            poids_d.insert(4,".");
            tare_d.insert(4,".");
            break;
        
        case 5:
            poids_d.insert(3,".");
            tare_d.insert(3,".");
            break;
        
        default:
            break;
        }
        partage->setPoids(poids_d);
        partage->setTare(tare_d);
        (etatB_d & 0x10) ? partage->setUnite("kg") : partage->setUnite("lb");
    }
}