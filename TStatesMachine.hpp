#ifndef TSTATESMACHINE_HPP
#define TSTATESMACHINE_HPP

#include "screen.hpp"
#include "TPartage.hpp"
#include <string>

class TStatesMachine
    {
    public:
        // méthode
	TStatesMachine(TScreen *pScreen);
	virtual ~TStatesMachine();

	void run(unsigned char data);

    private:
	// constante
	enum states_t
	    {
			STX,
			ETAT_A,
			ETAT_B,
			ETAT_C,
			POIDS,
			TARE,
			CR,
			CKSM
	    };

	// membre de données
	TPartage *partage;
	TScreen *screen;
	states_t state;

	unsigned char etatA_d;
	unsigned char etatB_d;
	unsigned char total;

	std::string poids_d;
	std::string tare_d;


	states_t (TStatesMachine::*tabStates[CKSM+1])(unsigned char data);

	// méthode
	states_t stx(unsigned char data);
	states_t etatA(unsigned char data);
	states_t etatB(unsigned char data);
	states_t etatC(unsigned char data);
	states_t poids(unsigned char data);
	states_t tare(unsigned char data);
	states_t cr(unsigned char data);
	states_t cksm(unsigned char data);

	void analyse(void);
    };
#endif