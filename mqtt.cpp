#include "mqtt.hpp"
#include "TConfiguration.hpp"

using namespace std;

TMqtt::TMqtt(void *shared,const char *id,const char *host,int port) : mosqpp::mosquittopp(id)
	{
	screen = (TScreen *)shared;
	partage = TPartage::getInstance();
	screen->dispStr(0,1,"0001");
	mqttTable["RAM/alarmes/etats/ALR_CNX_BAL"] = &TMqtt::messageAlarme;
	
	mosqpp::lib_init();
	connect(host,port,120);
	}

TMqtt::~TMqtt()
	{
	mosqpp::lib_cleanup();
	}

void TMqtt::on_connect(int rc)
	{
		screen->dispStr(0,7,"fonction");
	if(rc == 0)
	{
	    screen->dispStr(1,10,"Connected : OK  ");

	    subscribe(NULL,"RAM/alarmes/etats/ALR_CNX_BAL/#",0);
	}
	else
		screen->dispStr(1,10,"Connected : Fail");
	}

void TMqtt::on_message(const struct mosquitto_message *message)
	{
	string topic = message->topic;
	string payload = (char *)message->payload;

	screen->dispStr(1,11,(char *)message->topic);
	screen->dispStr(15,11,"    ");
	screen->dispStr(15,11,(char *)message->payload);

	auto it = mqttTable.find(topic);
	if(it != mqttTable.end())
		it->second(this,payload);

#if 0
	if(topic.substr(0,7) == "module/")
		{
		if(topic.substr(7,8) == "1")
			{
			partage.setModule1( (payload == "on")? true : false );
			}
		else if(topic.substr(7,8) == "2")
			{
			partage.setModule2( (payload == "on")? true : false );
			}
		else if(topic.substr(7,8) == "3")
			{
			partage.setModule3( (payload == "on")? true : false );
			}
		else if(topic.substr(7,8) == "4")
			{
			partage.setModule4( (payload == "on")? true : false );
			}
		else if(topic.substr(7,8) == "5")
			{
			partage.setModule5( (payload == "on")? true : false );
			}
		else if(topic.substr(7,8) == "6")
			{
			partage.setModule6( (payload == "on")? true : false );
			}
		}
#endif
	}

void TMqtt::on_subscribe(int mid,int qos_count,const int *granted_pos)
	{
	screen->dispStr(1,12,"on_subcribe");
	}

void TMqtt::messageAlarme(string val){
	if(val=="ACK"){
		partage->setErreur(false);
	}
}

// void TMqtt::messageModule1(string val)
// 	{
// 		if(val=="on")
// 			partage->setModule(1,1,0);
// 		else if(val=="off")
// 			partage->setModule(0,1,0);
// 	}

// void TMqtt::messageModule2(string val)
// 	{
// 		if(val=="on")
// 			partage->setModule(1,2,0);
// 		else if(val=="off")
// 			partage->setModule(0,2,0);
// 	}

// void TMqtt::messageModule3(string val)
// 	{
// 		if(val=="on")
// 			partage->setModule(1,3,0);
// 		else if(val=="off")
// 			partage->setModule(0,3,0);
// 	}

// void TMqtt::messageModule4(string val)
// 	{
// 		if(val=="on")
// 			partage->setModule(1,4,0);
// 		else if(val=="off")
// 			partage->setModule(0,4,0);
// 	}

// void TMqtt::messageModule5(string val)
// 	{
// 		if(val=="on")
// 			partage->setModule(1,5,0);
// 		else if(val=="off")
// 			partage->setModule(0,5,0);
// 	}

// void TMqtt::messageModule6(string val)
// 	{
// 		if(val=="on")
// 			partage->setModule(1,6,0);
// 		else if(val=="off")
// 			partage->setModule(0,6,0);
// 	}

string TMqtt::getMqttConfig(string nameFichierConfig)
	{
		return TConfiguration(nameFichierConfig).getParametreConfiguration();
	}

