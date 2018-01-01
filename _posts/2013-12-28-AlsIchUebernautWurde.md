---
layout: post
title: Als ich Übernaut wurde
---


## Die Ausgangslage
Schön und gut, wenn man weiß, was man machen will. Ich will ein Blog mit Ghost aufbauen. Aber wo soll es gehostet werden? Node.js ist bisher bei Providern noch nicht weit verbreitet und mein Geldbeutel ist schmal. Das schränkt die Auswahl schon mal ein. 
Ausserdem brauche ich SSH Zugriff auf den Server. Nicht zwingend mit Admin-Rechten, aber ich will meine benötigten Pakete selbst installieren können. Und das am besten von der Shell aus und nicht von einer Web-Oberfläche.

## Der passende Provider

### Eventuell mit Amazon EC2?

![Amazon EC2](/images/EC2_Management_Console.png)

Die erste Idee war [Amazon EC2](http://aws.amazon.com/de/ec2/). Amazon EC2 erfüllt schon fast alle meine Ansprüche. Und die Mikro-Instanz ist auch ein Jahr lang kostenlos. Danach aber kostet es Geld. Und das in einer [Preisstruktur](http://aws.amazon.com/de/ec2/pricing/), welche nicht ganz einfach zu durchschauen ist. So hatte ich es mir nicht vorgestellt. Ich bin zwar bereit, für einen Service zu bezahlen, aber eben nur in einem gewissen Rahmen.

### Und hier kommt Uberspace.de
Dann wurde ich durch eine [Ghost Installationsanleitung](https://postpoeia.name/blogs/mytho/2013/09/21/ghost-auf-uberspace-installieren/) auf den deutschen Provider [Uberspace](http://uberspace.de) aufmerksam. Uberspace ist ein Provider der etwas anderen Art. Das Interessanteste an Uberspace: Das [Preismodell](https://uberspace.de/prices). Man bezahlt so viel, wie es einem wert ist. Prepaid. Der Mindestpreis ist 1€/Monat, fair wäre es aus meiner Sicht, 5€/Monat zu geben.

![Ubernaut werden](/images/Ubernaut_werden___Uberspace_de.png)

Dazu kommt die Grundeinstellung von Uberspace. Schnell, einfach und an vielen Stellen verblüffend pragmatisch. Das fängt schon in der Testphase an. Einfach einen Loginnamen und ein Passwort eingeben ... fertig. Mehr an Daten ist nicht nötig. Und Uberspace kann einen Monat lang unentgeltlich ausprobiert werden. So einfach wird es einem selten gemacht. 
Wenn man seinen Account erstellt hat, kann man sich einfach per SSH auf den Server verbinden, Ghost herunterladen und starten.

Viel Positives wird auch über den Support bei Uberspace berichtet. Bisher hatte ich ihn aber noch nicht nötig, da die Dokumentation auf der Webseite und im Uberspace Wiki für mich ausgereicht haben. Aber gut zu wissen, dass es im Notfall einen kompetenten und freundlichen Support gibt.

## Fazit
Mit  seiner Philosophie und dem Preismodell hebt sich Uberspace von allen anderen mir bekannten Providern ab. Er ist ein ungewöhnlicher Provider, dessen Geschäftsmodell man unterstützen sollte. Und das ganz im eigenen Interesse. Klar, das Uberspace System eignet sich nur für kleine und mittlere Websites, aber da passt es ganz wunderbar. Für mich ist Uberspace der Provider der Wahl und so wurde ich (nach 3 Wochen Test) ein Ubernaut.
![Grobskiziert.de auf Uberspace](/images/grobskizziert_uberspace.png)(http://grobskizziert.de)

