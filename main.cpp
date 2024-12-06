//============================================================================
// Name        : TemplateThreadCom.cpp
// Author      : SG
// Version     :
// Copyright   : Your copyright notice
// Description : Template Thread Com
//============================================================================

#include "clavier.hpp"
#include "screen.hpp"
#include "TCom1.hpp"
#include "task1.hpp"
#include "TPartage.hpp"

int main(int argc, char *argv[])
{
  char car;

  // Initialisation task Principal
  TThread::initTaskMain(SCHED_FIFO, 0);

  // Création Clavier et console
  TClavier *clavier = TClavier::getInstance();
  TScreen *screen = new TScreen();
  screen->start();
  TPartage *partage = TPartage::getInstance();

  // Création tâches
  TTask1 *task1 = new TTask1("Task 1", screen, SCHED_FIFO, 99, 0);
  TCom1 *com = new TCom1(TCom1::getComConfig("com.def").c_str(),screen,98,TCom::b9600,TCom::pPAIR,TCom::dS7,5000);

  com->setSignalTimeout(1);

  screen->dispStr(0,1,"Poids :");
  screen->dispStr(0,2,"Tare :");
  screen->dispStr(0,3,"Unite :");
  screen->dispStr(0,4,"Erreur :");

  // Démarrage tâches
  task1->start();
  com->start();
  // Traitement tâche principale
  do
  {
    car=0;
    // Traitement
    if (clavier->kbhit())
      car = clavier->getch();
    screen->dispStr(10,1,"          ");
    screen->dispStr(10,1,partage->getPoids());
    screen->dispStr(10,2,"          ");
    screen->dispStr(10,2,partage->getTare());
    screen->dispStr(10,3,"          ");
    screen->dispStr(10,3,partage->getUnite());
    screen->dispStr(10,4,"          ");
    screen->dispStr(10,4,(partage->getErreur()) ? "on" : "off");
  } while ((car != 'q') && (car != 'Q'));

  // Destruction tâches
  if (com)
    delete com;
  if (task1)
    delete task1; 

  // Destruction console
  if (screen)
    delete screen;

  return 0;
}
