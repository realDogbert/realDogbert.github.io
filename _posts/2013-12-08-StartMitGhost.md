---
layout: post
title: Start mit Ghost
---


![Ghost](/images/Screenshot_Ghost_org.png)

Irgendwann gibt es einen Zeitpukt, an dem man schon so viel gelesen hat, dass es Zeit wird, auch selbst einmal etwas zu schreiben.
Bei mir war der Auslöser weniger ein Drang, der Welt etwas mitzuteilen (es ist mir schon klar, dass es inzwischen gefühlt mehr Blogger als Leser gibt), als eher der, etwas auszuprobieren: das Blogging System **Ghost**.

## Warum Ghost?
Eigentlich weiß ich nicht mehr genau, wie ich auf Ghost als Blogging Plattform aufmerksam wurde. Aber ich weiß noch, dass ich von der grundlegenden Idee von [Ghost](http://john.onolan.org/project-ghost/) sofort überzeugt war. 
Und von der Gestaltung. Die GUI von Ghost ist extrem einfach, übersichtlich und sehr ansprechend. So einfach und ansprechend, dass ich diese Oberfläche vom ersten Augenblick an benutzen will. Und wenn ich dafür mit dem Bloggen anfangen muss ...

## Die ersten Schritte
Leider war das nicht ganz so einfach, wie man es sich wünschen würde, da [Ghost](http://ghost.org) noch kein fertiges Produkt ist. Ghost ist bei Weitem noch nicht so weit entwicklet wie z.B. [Medium](https://medium.com), wo man sich registriert und dann einfach los-bloggen kann. Wenn man Ghost nutzen will, dann muss man den Beta-Code von Ghost auschecken und auf seinem eigenen WebServer installieren, konfigurieren und starten. 
Das Entwicklerteam von Ghost arbeitet daran, diesen Umstand zu ändern, aber aktuell ist das der einzige Weg, Ghost zu nutzen.

### Ghost Setup
Die Technik hinter Ghost ist aus meiner Perspektive heraus ungewöhnlich: Das komplette Backend ist in **JavaScript** geschrieben und läuft auf [node.js](http://nodejs.org). 
Ich komme aus der JEE-Welt, d.h. ich tue mich also schon von Haus aus schwer damit, Skript-Sprachen-basierte Systeme wie z.B. PHP zu akzeptieren (btw: Ich bin gerade dabei, an dieser Stelle ein wenig flexibler zu werden). Und dann auch noch JavaScript!

Blicken wir mal ein paar Jahre zurück. Da war es verpöhnt, wenn eine WebSite nicht auch ohne JavaScript auskam. Der damalige Konsens lautete: JavaScript ist langsam, die Sprache ist nicht ausgereift, die ganze Technik ein einziges Sicherheitsrisiko! 
Wenn ich aber noch weiter in die Vergangenheit zurück blicke, dann sind das fast die gleichen Argumente, wie sie gegen Java und Java Application Server vorgebracht wurden. Aber jetzt verdiene ich genau damit meinen Lebensunterhalt. Und nicht etwa mit C/C++ Server, so wie einige Java Skeptiker es damals unverbesserlich und unbelehrbar behaupteten.
Also, mal sehen, wie sich JavaScript inwischen so auf dem Server macht.

Node.js ist noch keine der Komponenten, die automatisch auf einem Server installiert sind. Und es ist auch noch nicht wirklich so weit, dass sich Provider ernsthaft damit beschäftigen. Also ist Handarbeit angesagt. Node.js installieren, Ghost laden, installieren, konfigurieren und als Serverprozess (im Produktions-Modus) starten. Wenn man es noch schöner machen möchte, dann muss man noch einen Apache installieren und auf den Ghost-Port weiterleiten.

### Das eigene Ghost Blog
#### Der 1. Start
Wenn Ghost läuft, dann sollte man sich **sofort** einloggen, denn der 1. Login wird automatisch der Admin-Account. Und das will man vermutlich gerne selbst sein.
Kurz die eigenen Daten eingeben, ein Icon und ein Startbild hochladen und damit hat man Ghost prinzipiell schon vollständig konfiguriert.

#### Der Ghost Editor
Jetzt kann man anfangen, seine eigenen Posts zu schreiben. Ein Beispiel-Post wird bereits mit der Ghost Installation ausgeliefert: **Welcome to Ghost**.
Mit diesem Post wird gezeigt, wie man gültige [Markdown-Syntax](http://daringfireball.net/projects/markdown/syntax) für seine eigenen Einträge schreibt. Das beinhaltet Überschriften, Hervorhebungen, Listen, aber auch Links, Bilder und Code-Snippets. Ich kann nur jedem empfehlen, sich diesen Post genauer anzusehen.
Der Editor für die Ghost Posts ist zweigeteilt: Auf der linken Seite ist die Arbeitsfläche und rechts die Live-Preview des Posts.

![Ghost Editor](/images/Ghost_Editor.png)

Mit diesem Editor ist es verblüffend schnell und einfach möglich, seine eigenen Posts zu tippen. Sehr nett ist auch das Feature, für Bilder erst mal Platzhalter im Text zu generieren und dann die richtigen Bilder auf die Preview zu ziehen. Die Bilder werden dann automatisch eingesetzt, auf den Server hochgeladen und die URL im Text aktualisiert.

#### Themes
Die Darstellung der Übersicht und der einzelnen Posts wird bei Ghost mit sogenannten **Themes** realisiert. Schon das mitgelieferte Standard Theme *Casper* ist durchaus überzeugend.

![Casper Theme](/images/grobskizziert_casper.png)

Es hat sich aber bereits eine Community gebildet, die sich mit der Erstellung von Themes beschäftigt. Da ich schon immer ein Fan des (inzwischen alten) Designs von Medium bin, habe ich mir ein Theme gesucht, das so ähnlich aussieht. Es hat nicht lange gedauert und ich habe das Theme [*Readium*](https://github.com/starburst1977/Readium) gefunden, es geklont und als Basis für mein eigenes Theme [*grobskizziert*](https://github.com/realDogbert/grobskizziert) hergenommen.

![Grobskizziert Theme](/images/grobskizziert_custom.png)

Bisher habe ich das Theme *Readium* nur dahingehend angepasst, dass ich es auf deutsch übersetze habe. Ich plane aber noch einige Verbesserungen.

## Was fehlt noch bei Ghost?
Ghost ist ein noch sehr junges Projekt. Die Realisierung von Ghost wurde über ein erfolgreiches [Kickstarter Projekt](http://www.kickstarter.com/projects/johnonolan/ghost-just-a-blogging-platform/) erst im Mai 2013 ermöglicht. Die aktuelle Version 0.3.x von Ghost enthält gerade mal so viel, dass man Posts erstellen und veröffentlichen kann. Das kann Ghost aber schon sehr gut.
Die von mir am schmerzlichsten vermissten Features sind

* das Dashboard
* das Konzept für die Erstellung von Plugins
* ein klares Rollen- und Rechtekonzept

Das sind aber alles Features, die bereits auf der Roadmap des Ghost Entwicklerteams stehen.

## Fazit
Ghost steckt noch in den Kinderschuhen, sowohl vom Funktionsumfang, als auch von der Technologie. Es wird sich zeigen, ob die Blogger-Community das Tool annimmt und ob sich genug Entwickler rege an der Weiterentwicklung des Ghost-Core Systems und von Plugins beteiligen. Auch die gewählte Technologie (node.js) muss sich erst noch beweisen. Wie wird sich das Ghost System pflegen und betreiben lassen? Was passiert bei Updates? Kann das System für große Blogs hinreichend gut skalieren?

Es wird spannend werden zu sehen, wie Ghost sich im nächsten Jahr entwicklen wird. Auf jeden Fall ist es bereits jetzt ein System, bei dem man noch mit sehr wenig Aufwand einsteigen und auch gleichzeitig mitwachsen kann.