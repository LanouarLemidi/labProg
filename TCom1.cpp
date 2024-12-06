#include "TCom1.hpp"
#include "TConfiguration.hpp"

TCom1::TCom1(const char *name, void *shared, int priority, baudrate_t baudRate,
            parity_t parite, dimData_t dimData, int32_t timeoutRxMs):TCom(name,shared,priority,baudRate,parite,dimData,timeoutRxMs)
{
    screen=(TScreen *)shared;
    machine = new TStatesMachine(screen);
    partage = TPartage::getInstance();
}

TCom1::~TCom1(){}

void TCom1::rxCar(unsigned char car)
{
    machine->run(car);
}

void TCom1::rxTimeout(void)
{
    partage->setErreur(true);
}

std::string TCom1::getComConfig(std::string nameFichierConfig)
{
    return TConfiguration(nameFichierConfig).getParametreConfiguration();
}
