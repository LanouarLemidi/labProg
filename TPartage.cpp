#include "TPartage.hpp"

TPartage::TPartage(void) {
    for (uint8_t i = 0; i < 3; i++)
    {
        tab[i]="";
    }
}

void TPartage::protectTab(void){
    mutexTab.take();
}
    
void TPartage::unprotectTab(void){
    mutexTab.release();
}

void TPartage::protectFlag(void){
    mutexFlag.take();
}

void TPartage::unprotectFlag(void){
    mutexFlag.release();
}

void TPartage::clearFlag(void){
    protectFlag();
    flag = false;
    unprotectFlag();
}

bool TPartage::getFlag(void){
    bool tmp;
    protectFlag();
    tmp = flag;
    unprotectFlag();
    return tmp;
}
    
void TPartage::setPoids(std::string poids){
    if(poids != getPoids()){
        protectTab();
        tab[0]=poids;
        unprotectTab();
        protectFlag();
        flag = true;
        unprotectFlag();
    }
}

std::string TPartage::getPoids(void){
    std::string tmp;
    protectTab();
    tmp = tab[0];
    unprotectTab();
    return tmp;
}

void TPartage::setTare(std::string tare){
    if(tare != getTare()){
        protectTab();
        tab[1]=tare;
        unprotectTab();
        protectFlag();
        flag = true;
        unprotectFlag();
    }
}

std::string TPartage::getTare(void){
    std::string tmp;
    protectTab();
    tmp = tab[1];
    unprotectTab();
    return tmp;
}

void TPartage::setUnite(std::string unite){
    if(unite != getUnite()){
        protectTab();
        tab[2]=unite;
        unprotectTab();
        protectFlag();
        flag = true;
        unprotectFlag();
    }
}

std::string TPartage::getUnite(void){
    std::string tmp;
    protectTab();
    tmp = tab[2];
    unprotectTab();
    return tmp;
}

void TPartage::setErreur(bool erreur){
    protectErreur();
    TPartage::erreur=erreur;
    unprotectErreur();
}

bool TPartage::getErreur(void){
    bool tmp;
    protectErreur();
    tmp = erreur;
    unprotectErreur();
    return tmp;
}

void TPartage::protectErreur(void){
    mutexErreur.take();
}

void TPartage::unprotectErreur(void){
    mutexErreur.release();
}