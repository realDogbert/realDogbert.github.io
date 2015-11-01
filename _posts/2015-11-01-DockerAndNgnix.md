---
layout: post
title: Docker, VirtualBox und Sendfile
---

Wie stellt man sich die Entwicklung einer Webseite vor? An sich ganz einfach, man erzeugt ein Verzeichnis und legt dort die zu der Webseite gehörenden HTML, CSS und JavaScript Dateien ab. Dann öffnet man die lokale Startseite mit dem Browser und entwickelt so vor sich hin.

Etwas schwieriger wird es, wenn die Webseite nur dann funktioniert wenn sie über einen Server ausgelifert wird. Aber auch da gibt es eine Lösung: Man installiert auf dem lokalen System einfach einen WebServer, z.B.  [Apache](https://httpd.apache.org) oder [NGINX](https://www.nginx.com).
Aber warum das lokale System mit immer neuen Installationen von Server verschmutzen? Mit [Docker](https://www.docker.com) geht es so viel einfacher:

{% highlight Powershell %}
docker run --name some-nginx -v [lokales Entwicklungsverzeichns]:/usr/share/nginx/html:ro -d nginx
{% endhighlight %}

Schon wird die aktuellste Version von NGINX vom [Docker Hub](https://hub.docker.com) gezogen und auf dem lokalen System gestartet. Keine Installation mehr notwendig (obwohl die mit brew inzwischen auch sehr leicht von der Hand geht).
Mit 

`-v [lokales Entwicklungsverzeichns]:/usr/share/nginx/html:ro` 

wird dann der aktuelle Entwicklungsstand direkt in die NGINX VM gelinkt und die Webseite kann im Browser mit _http://[lokale IP der Docker VM]:8080_ geöffnet wird.
Funktioniert auch sehr gut bis auf ...

##Das Problem

Während des Entwicklens neigt man ja dazu die eine oder andere Datei zu ändern. Und diese Änderungen möchte mann dann auch sofort im Browser sehen. Bei HTML Dateien funktioniert das noch ganz gut, aber andere statische Dateien, wie z.B. CSS oder auch JSON Dateien werden nicht geupdated, es wird einfach der alte Stand ausgeliefert. 
Der Server meldet zwar ein freudiges *200 OK* zurück, aber die durchgeführten Anpassungen in der Datei sind nicht zu sehen. Die Datei sieht noch so aus wie am Anfang. Da hilft auch ein Neustart des Servers oder auch des ganzen Docker Container nichts.

##Die Lösung

In den neuesten Versionen von Apache und NGINX ist das sogenannte _sendfile_ Feature verbaut. Damit kommt die aktuelle Version von VirtualBox anscheinend nicht klar. Ich hätte das Problem vermutlich noch Stunden gesucht, wenn ich nicht auf den Artikel [VirtualBox Hates Sendfile][VBHatesSendfile] gestoßen wäre. Wenn das erst mal erkannt wird, dann ist die Lösung eigentlich trivial: man deaktiviert das _sendfile_ Feature im Server. 
Für den NGINX Server kann man das im der Datei nginx.conf im http-Bereicht mit dem Feature Toggle _sendfile off;_ erreichen. Ein simple Konfiguration für NGINX sieht dann z.B. so aus:


{% highlight Powershell %}
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        off;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
{% endhighlight %}


[VBHatesSendfile]: https://abitwiser.wordpress.com/2011/02/24/virtualbox-hates-sendfile/