---
layout: post
title: Ghost Theme mit Docker erstellen
---


Das Standard Ghost Theme Casper ist ein sehr schönes Theme, aber ein wenig individueller sollte es schon sein. Also muss ein eigenes Ghost Theme her und dafür ist eine lokale Entwicklungsumgebung nötig. Aber wie erstellt man am schnellsten eine Entwicklungsumgebung für Ghost? Die Antwort ist ganz einfach: mit Docker.
Die Vorteile liegen auf der Hand
Man hat immer die aktuellste Version von Ghost und der dazu benötigten Infrastruktur (node, sqlite) zur Verfügung
Durch die Docker Images ist eine Installation nicht notwendig. Die Version im Docker Image ist bereits vorinstalliert (im Besten Fall sogar vom Ghost Team selbst)
Ghost kann sehr schnell und ohne "Rückstände" vom eigenen Rechner wieder entfernt werden
Docker Images sind Read-Only, d.h. Ghost kann immer wieder auf einen initialen ZUstand zurückgesetzt werden
Eine grundlegende Einführungen zu Docker gibt es auf der Docker WebSite oder auch auf YouTube, eine Anleitung wie man ein Ghost Theme erstellt findet sich auf der Ghost WebSite. In diesem Post geht es einzig darum wie man Docker nutzen kann, um eine Entwicklungsumgebung innerhalb von 5 Minuten auf seinem lokal Rechner einrichten kann.
Boot2Docker

Docker läuft leider nicht native auf allen Betriebssystemen. Wenn man Mac OS oder Windows nutzt, dann muss man zuerst Boot2Docker installieren. Einfach den Installer für das eigenen Betriebssystem von der Boot2Docker WebSite herunterladen und installieren.
Danach eine Shell öffnen und Boot2Docker starten. 

{% highlight PowerShell %}
boot2docker start 
{% endhighlight %}

*Hinweis:* Vor dem 1. Start von Boot2Docker muss Boot2Docker initialisiert werden. 

{% highlight PowerShell %}
boot2docker init 
{% endhighlight %}

Wenn Boot2Docker gestartet wurde, dann kann man mit 
{% highlight PowerShell %}
boot2docker ip
{% endhighlight %}
 
Die IP Adresse der gestarteten Boot2Docker-VM erfragen. Im Normalfall sollte das 192.168.59.103 sein. Diese IP Adresse ist wichtig, damit kann man die GUI des Ghost Docker-Containers im Browser aufrufen.
Docker

Jetzt kommen wir zu Docker. Der Docker Hub stellt bereits ein komplett vorinstalliertes Image für Ghost zur Verfügung: dockerfile/ghost. Dieses Image lädt man mit 

{% highlight PowerShell %}
docker pull dockerfile/ghost
{% endhighlight %}

Das Image kann mit dem Befehl 

{% highlight PowerShell %}
docker run -d -e NODE_ENV=development -p 80:2368 -v ~/Sites/ghost-grobskizziert/:/ghost-override --name ghost dockerfile/ghost 
{% endhighlight %}

dann gestartet werden.
Die einzelnen Parameter bedeuten dabei folgendes:

{% highlight PowerShell %}
docker pull dockerfile/ghost
{% endhighlight %}
docker run –d 

Der Befehl um einen Docker-Container zu starten. Der Parameter –d gibt an, dass der Container als Deamon, also im Hintergrund laufen soll.

{% highlight PowerShell %}
docker pull dockerfile/ghost
{% endhighlight %}
-e NODE_ENV=development

Das Image dockerfile/ghost ist so aufgebaut, dass es Ghost im Production-Mode startet. Für die Entwicklung ist das aber schlecht, da die Themes gecached werden, d.h. man kann seine Änderungen erst nach einem Restart, bzw. einem Wechsel des Ghost Themes sehen. 
Um Ghost im Develpoment-Mode zu starten muss einfach die Umgebungsvariable NODE_ENV auf den Wert development gesetzt werden und schon wird das Theme nicht mehr gecached. Jede Änderung am HTML oder CSS Source ist sofort sichtbar.
-p 80:2368 
Im Docker-Container läuft die Node Installation von Ghost auf Port 2368. Nach außen hin machen wir diesen Port auf Port 80 sichtbar. Die Ghost Installation auf unserem Docker-Container ist damit über http://[Boot2Docker-IP]:80 sichtbar. Im oben genannten Beispiel also unter http://192.168.59.103 (der Port 80 muss nicht explizit mit angegeben werden, da es sich um den http Standard-Port handelt).
-v ~/Sites/ghost-grobskizziert/:/ghost-override 
Hier wird ein Docker Volume auf einen lokalen Dateipfad des Hosts-Rechners gemounted. Die Syntax dafür ist –v [Lokaler Pfad]:[Pfad im Docker Container]. Somit ist der Pfad ~/Sites/ghost-grobskizziert/ des lokalen Dateisystems im Docker-Container als /ghost-override sichtbar. 
Unter ~/Sites/ghost-grobskizziert/ sind die Konfigurationsdatei für Ghost, also auch der Ghost Inhalt inkl. der Themes abgelegt.
Dateistruktur für Ghost-Override
Im der obigen Abbildung kann man die Dateistruktur des ghost-override Volumes sehen. Auffällig ist die Ghost Konfigurations-Datei config.js mit der die Ghost Installation im Docker-Container agepasst werden kann. 
Des Weiteren kann man das themes Verzeichnis sehen. Bei bei mir liegen dort das original casper theme und das eigene Arbeitsverzeichnis für das grobskizziert theme drinnen.
--name ghost 
Der Docker-Container wird mit dem Namen ghost versehen und kann unter diesem Namen gestoppt und gestartet werden. 
Wenn in einem Docker Theme eine neue Datei hinzugefügt wird, dann ist diese erst nach einem Restart von Ghost sichtbar (auch im Development Mode). Das geht mit dem vergebenen Namen sehr einfach: 

{% highlight PowerShell %}
docker restart ghost
dockerfile/ghost
{% endhighlight %}

Zu guter letzt muss Docker mitgeteilt werden aus welchem Image er den Docker-Container starte soll. Natürlich ist es das voher aus dem Docker Hub geladene Image für Ghost.
Ghost

und jetzt kann Ghost im Browser unter http://[Boot2Docker-IP]:80 aufgerufen werden.
Ghost Interface
Auch das Administrations Interface von Ghost kann mit http://[Boot2Docker-IP]:80/ghost aufgerufen werden.
Ghost Admin
Docker (nochmal)

Bisher wurde der Container über das Ghost Docker Image gestartet. Der Container kann jederzeit mit

{% highlight PowerShell %}
docker stop ghost
gestoppt und mit 
docker start ghost
{% endhighlight %} 

wieder gestartet werden. Das ist wesentlich kürzer als der 1. Start über das Docker Image.