#include "task1.hpp"
#include "temps.hpp"

TTask1::TTask1(const char *name,void *shared,int32_t policy,int32_t priority,int32_t cpu) :
                                                       TThread(name,shared,policy,priority,cpu)
    {
	std::string nameMqtt;

	screen = (TScreen *)shared;
	partage = TPartage::getInstance();

	nameMqtt = TMqtt::getMqttConfig();
	mqtt = new TMqtt(screen,"testMqtt",nameMqtt.c_str());
	
    screen->dispStr(1,8,"Task MQTT (CPU :  ) :");
    screen->dispStr(30,8,nameMqtt.c_str());
   }

TTask1::~TTask1()
    {
	if(mqtt)
		delete mqtt;
    }

void TTask1::task(void)
    {
    // variable locale
	bool erreurEnv = false;
    // char bufStr[50];

    // synchronisation démarrage tâche
    signalStart();

    sleep(2); 

    while(1)
		{
		//traitement

		if(partage->getFlag()){
			mqtt->publish(NULL,"RAM/balance/etats/poids",partage->getPoids().size(),partage->getPoids().c_str());
			mqtt->publish(NULL,"RAM/balance/etats/tare",partage->getTare().size(),partage->getTare().c_str());
			mqtt->publish(NULL,"RAM/balance/etats/unite",partage->getUnite().size(),partage->getUnite().c_str());
			partage->clearFlag();
		}

		if(partage->getErreur() && !erreurEnv){
			mqtt->publish(NULL,"RAM/alarmes/etats/ALR_CNX_BAL",3,"ON",0,true);
			erreurEnv = true;
		}

		if(!partage->getErreur() && erreurEnv){
			mqtt->publish(NULL,"RAM/alarmes/etats/ALR_CNX_BAL",1,"",0,true);
			erreurEnv = false;
		}

		if(mqtt->loop() != 0)
			mqtt->reconnect();

		usleep(250000);   // 250 ms
		}
    }
