#include "TConfiguration.hpp"

TConfiguration::TConfiguration(std::string nomFichierConfiguration)
{
    std::ifstream fichier;
    fichier.open(nomFichierConfiguration);
    if(!fichier)
    {
        std::ofstream newFichier(nomFichierConfiguration);
        newFichier<<"/dev/ttyS0";
        newFichier.close();
        fichier.open(nomFichierConfiguration);
    }
    fichier>>parametreConfiguration;
    fichier.close();
}

TConfiguration::~TConfiguration()
{}

std::string TConfiguration::getParametreConfiguration(void)
{
    return parametreConfiguration;
}