---
title: "LLM Wiki, Zettelkasten und die Frage nach dem Denken"
author: "Frank von Eitzen"
published: "2026-04-06"
excerpt: "Andrej Karpathys Idee eines von AI gepflegten Wikis ist spannend, weil sie Wissensarbeit drastisch vereinfachen könnte. Gleichzeitig stellt sie die alte Frage neu: Was passiert mit dem Denken, wenn die Maschine zu viel Vorarbeit übernimmt?"
slug: "llm-wiki-zettelkasten-und-die-frage-nach-dem-denken"
tags:
  - ai
  - blog
---

Okay, ich weiß nicht, wie es euch geht, aber ich habe das Gefühl, dass ich zu viel YouTube schaue. Heute Morgen war da keine Ausnahme. Diesmal hat sich das Scrollen aber tatsächlich gelohnt: Ich bin über [ein Video von Nate Herk](https://youtu.be/sboNwYmH3AY?si=CrUq0qcuWfQeJUzo) gestolpert, in dem es um eine Idee von Andrej Karpathy geht. Genauer gesagt um die Frage, wie man persönliches Wissensmanagement mit AI verbinden kann.

Wenn Andrej Karpathy so eine Idee formuliert, lohnt es sich zumindest, kurz stehen zu bleiben. Er ist schließlich nicht irgendein Name aus der Timeline, sondern einer der prägenden Köpfe der modernen AI: Stanford, OpenAI, Tesla, Autopilot, Full Self-Driving. Und inzwischen fällt er für mich vor allem dadurch auf, dass er komplexe technische Themen radikal klar erklären kann. Seine Notizen zur Idee stehen als [Gist auf GitHub](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) öffentlich bereit. Also habe ich mir angeschaut, worum es bei seiner Idee eigentlich geht.

## Die Kurzfassung: Ein Wiki statt ewiger Neu-Suche

Der Kern der Idee ist ziemlich einfach und gerade deshalb spannend: Wissen soll nicht bei jeder Frage neu aus einem Dokumentenstapel zusammengesucht werden. Stattdessen baut ein LLM schrittweise eine dauerhafte, verlinkte Wissensbasis auf. Kein klassisches RAG im Sinne von: Datei hochladen, relevante Schnipsel raussuchen, Antwort generieren, fertig. Sondern eher: Quelle lesen, einordnen, zusammenfassen, an bestehende Notizen andocken, Widersprüche markieren und das Ganze beim nächsten Dokument weiter verfeinern.

Das Ergebnis ist eine Art **persistentes Wiki**, das mit jeder neuen Quelle besser wird. Die Verlinkungen sind schon da. Die Zusammenfassungen existieren bereits. Widersprüche müssen nicht bei jeder Anfrage neu entdeckt werden. Das Wissen wird also nicht ständig neu hergeleitet, sondern laufend gepflegt.

## Wie das System gedacht ist

Karpathy beschreibt im Grunde drei Ebenen:

- **Rohquellen**, die unverändert bleiben
- **eine Markdown-Wiki**, die vom LLM gepflegt wird
- **ein Schema oder Regelwerk**, das festlegt, wie neue Quellen eingearbeitet, Fragen beantwortet und Inhalte gepflegt werden

Dazu kommen ein paar einfache, aber clevere Prozesse: neue Quellen ingestieren, Fragen gegen die bestehende Wiki beantworten und die Wissensbasis regelmäßig auf Inkonsistenzen, veraltete Aussagen oder fehlende Verlinkungen prüfen.

Das Charmante daran: Das Ganze wirkt nicht wie ein riesiges Enterprise-System, sondern eher wie ein Setup, das man sich mit überschaubarem Aufwand selbst bauen kann. Ein Verzeichnis mit Markdown-Dateien, ein LLM-Agent, vielleicht [Obsidian](https://obsidian.md/) zum Lesen und Navigieren, und los geht's. Schon allein diese Einfachheit erklärt für mich einen Teil der Aufmerksamkeit.

## Neu ist die Idee eigentlich nicht

Ganz ehrlich: Wirklich neu ist das nicht.

Vom Grundgedanken her erinnert mich das stark an den [**Zettelkasten**](https://de.wikipedia.org/wiki/Zettelkasten) von [Niklas Luhmann](https://de.wikipedia.org/wiki/Niklas_Luhmann). Auch dort geht es darum, Gedanken nicht einfach nur abzulegen, sondern sie so miteinander zu verknüpfen, dass daraus neue Einsichten entstehen. Luhmann hat selbst beschrieben, dass er mit seinem Zettelkasten gewissermaßen ein Gespräch führt. Genau dieses Bild passt auch hier ziemlich gut.
Wer tiefer in das Zettelkasten-Prinzip einsteigen möchte, dem kann ich das Buch ["Das Zettelkasten-Prinzip" von Sönke Ahrens](https://www.amazon.de/s?k=Das+Zettelkasten-Prinzip+S%C3%B6nke+Ahrens) sehr empfehlen.

Wenn man es etwas moderner formulieren will, landet man schnell bei Systemen wie [**PARA** von Thiago Forte](https://fortelabs.com/blog/para/). Auch da geht es letztlich darum, Informationen nicht bloß zu sammeln, sondern so abzulegen, dass daraus später Arbeit, Klarheit und neue Gedanken entstehen.

Der eigentliche Unterschied liegt also nicht zwingend in der Methode, sondern in der **Arbeitsverteilung**. Früher musste man jeden Zettel selbst schreiben, verknüpfen und pflegen. Heute soll genau diese Fleißarbeit zu großen Teilen von der AI übernommen werden.

## Und genau da wird es interessant

Denn so bequem das klingt, so berechtigt ist für mich auch die Gegenfrage: Ist das wirklich ein Vorteil?

Luhmann musste seine Gedanken beim Schreiben zwangsläufig verdichten. Jede Notiz war Handarbeit. Genau darin lag vermutlich ein Teil der Denkleistung. Wer selbst formuliert, sortiert automatisch. Wer selbst zusammenfasst, trifft Entscheidungen. Wer selbst verlinkt, versteht Zusammenhänge oft tiefer.

Wenn die AI diesen Teil übernimmt, spart das ohne Frage Zeit. Aber ein Teil der kognitiven Vorarbeit fällt eben auch weg. Und ich bin nicht sicher, ob man das einfach ignorieren sollte. Ein perfekt gepflegtes Wissenssystem ist noch kein verstandenes Wissenssystem.

## Warum ich das trotzdem spannend finde

Trotzdem finde ich den Ansatz ziemlich reizvoll. Ich nutze Obsidian schon länger und speichere meine Notizen ohnehin als Markdown-Dateien, inklusive Verlinkungen. Das heißt: Der Datenbestand ist bei mir schon da. Und auch AI lasse ich längst bestimmte Aufgaben übernehmen, etwa beim Strukturieren, Umformulieren oder Aufbereiten von Notizen.

Insofern ist Karpathys Idee für mich weniger ein kompletter Neuanfang als eher ein logischer nächster Schritt. Nicht alles selbst sortieren müssen, sondern einen Teil der Pflege an ein System abgeben, das darin erstaunlich gut geworden ist. Das klingt zumindest nach einem Experiment, das sich lohnt.

## Mein Eindruck nach dem Lesen

Ich glaube nicht, dass man beim Wissenserwerb um eigene Denkarbeit herumkommt. Das wird auch mit noch so guter AI nicht verschwinden. Aber ich glaube sehr wohl, dass man sich eine Menge unnötiger Reibung sparen kann.

Warum sollte ich mir stundenlang Informationen zusammensuchen, um sie anschließend mühselig zu strukturieren, wenn mir die AI diesen Teil bereits vorbereiten kann? Wenn sie mir Material vorsortiert, verlinkt, zusammenfasst und in kleine, verdauliche Einheiten zerlegt, ist das ein echter Zeitgewinn.

Der entscheidende Punkt ist für mich nur: **Die letzte Meile bleibt menschlich.** Ich muss trotzdem lesen. Ich muss trotzdem prüfen. Ich muss trotzdem meine eigenen Schlüsse ziehen. Erst dann wird aus Information tatsächlich Wissen.

Und vielleicht ist genau das die Stärke dieser Idee: nicht Denken zu ersetzen, sondern Reibung aus dem Denken herauszunehmen. Das wäre schon mehr als genug.
