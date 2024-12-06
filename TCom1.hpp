#ifndef TCOM1_HPP
#define TCOM1_HPP

#include "com.hpp"
#include "screen.hpp"
#include "TPartage.hpp"
#include "TStatesMachine.hpp"

class TCom1 : public TCom
{
private:
    TScreen *screen;
    TStatesMachine *machine;
    TPartage *partage;

public:
    TCom1(const char *name, void *shared, int priority, baudrate_t baudRate = b115200, parity_t parite = pNONE, dimData_t dimData = dS8, int32_t timeoutRxMs = 25);
    virtual ~TCom1();
    virtual void rxCar(unsigned char car);
    virtual void rxTimeout(void);

    static std::string getComConfig(std::string nameFichierConfig = "./com.def");
};

#endif