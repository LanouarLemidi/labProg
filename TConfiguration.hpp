#ifndef TCONFIGURATION_HPP
#define TCONFIGURATION_HPP

#include <string>
#include <iostream>
#include <fstream>

class TConfiguration
{
private:
    std::string parametreConfiguration;
public:
    TConfiguration(std::string nomFichierConfiguration);
    ~TConfiguration();

    std::string getParametreConfiguration(void);
};
#endif