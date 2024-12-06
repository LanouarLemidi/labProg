#ifndef TPARTAGE_HPP
#define TPARTAGE_HPP

#include <string>
#include "singleton.hpp"
#include "mutex.hpp"
#include "sem.hpp"


class TPartage : public TSingleton<TPartage>
{
    friend class TSingleton<TPartage>;

private:
    std::string tab[3];
    bool erreur;
    bool flag;
  
    TMutex mutexFlag;
    TMutex mutexTab;
    TMutex mutexErreur;

    TPartage(void);

    TPartage(const TPartage &) = delete;
    TPartage &operator=(const TPartage &) = delete;

public:

    void protectFlag(void);
    void unprotectFlag(void);
    void clearFlag(void);
    bool getFlag(void);

    void protectTab(void);
    void unprotectTab(void);

    void protectErreur(void);
    void unprotectErreur(void);
    
    void setPoids(std::string poids);
    std::string getPoids(void);

    void setTare(std::string tare);
    std::string getTare(void);

    void setUnite(std::string unite);
    std::string getUnite(void);

    void setErreur(bool erreur);
    bool getErreur(void);
};

#endif