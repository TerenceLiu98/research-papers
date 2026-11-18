---
title: "When Correlation Is Not Enough: Validating Populism Scores from Supervised Machine-Learning Models"
type: paper
authors:
  - Michael Jankowski
  - Robert A. Huber
year: 2023
doi: "10.1017/pan.2022.32"
tags:
  - populism
  - measurement-validity
  - text-as-data
---

## TL;DR

A reanalysis of manifesto-based populism scores shows that strong agreement with expert surveys can survive incorrect assignment of manifesto content to party labels. Feature inspection and 500 reshuffles per country expose reliance on party names, language, and policy content rather than demonstrated measurement of populist rhetoric.

## Research Question

Do supervised classifiers trained on parties’ populist status measure degrees of populism in their texts, or primarily recover the party labels used for training?

## Motivation

Continuous historical measures would support comparisons across elections and countries. Yet a sentence’s origin in a populist party does not establish that it expresses anti-elitism and people-centrism. Correlation with expert surveys may reproduce the information already supplied by training labels while leaving changes over time unvalidated.

## Contributions

- Distinguishes prediction of party labels from content-valid measurement of a latent political construct.
- Audits influential features and documents incorrect manifesto-label assignments in the original Austrian corpus.
- Uses systematic manifesto-label reshuffling to demonstrate that apparently convincing external correlations can persist without correct content attribution.

## Method

The target is [[papers/how-populist-are-parties|Di Cocco and Monechi’s approach]]: sentences inherit binary PopuList party labels, a 70/30 sentence split supplies training and testing data, and country-specific random forests classify test sentences. A manifesto score is the fraction classified as populist.

Jankowski and Huber inspect mean-decrease-impurity feature importance, audit Austrian source assignments, and randomly reassign party labels to manifesto contents 500 times per country before rerunning the original procedure. These are document-level reassignments, not independent random labels for every sentence. They compare resulting scores with POPPA at party level and V-Party at manifesto level.

Their validity argument is that fitting a fixed party classification encourages agreement with other correlated expert measures. Deviations from that fixed label generate temporal score variation, but successful prediction alone does not establish whether those deviations represent substantive change. Averaging across elections for validation removes precisely that temporal variation.

## Experiments

The reanalysis covers Austria, France, Germany, Italy, the Netherlands, and Spain (Sections 3–4).

| Check | Reported finding | Implication |
| --- | --- | --- |
| German party-name dependence | 70.7% of AfD sentences classified positive contain “afd”; restricting to sentences without it reduces the score from 0.21 to 0.07 | Party self-reference drives much of the score |
| Spanish language differences | Four of the five leading features are Catalan; ECP receives 0.94 | Language can distinguish training classes without identifying populist content |
| Austrian corpus audit | Only 4 of 27 manifesto contents have correct labels | High scores for populist labels persist despite incorrect source attribution |
| Reshuffling | 500 iterations per country; in the German illustration, every manifesto scores significantly higher when assigned a populist label | The same content can receive different scores according to its training label |
| External correlations after reshuffling | Mean within-country correlation is 0.69 with POPPA and 0.56 with V-Party | Convergence with expert measures does not resolve content validity |

Four of the five leading Dutch features are party names. German features also reflect mainstream left-wing policy content; leading French and Italian features do not clearly identify a latent populism concept. Original POPPA correlations are not significantly better than reshuffled results in Austria, Germany, Italy, and Spain; France and the Netherlands perform substantially better, which still does not establish that the learned distinctions measure populism.

## Limitations

- The critique concerns this inherited-party-label design, not the impossibility of supervised populism measurement. The authors point to directly annotated paragraphs as a promising alternative requiring more resources.
- Impurity importance ranks predictive relevance but does not establish a feature’s directional effect or provide a causal explanation.
- The study diagnoses validity failures rather than supplying a replacement cross-national historical scale. Context-sensitive people-versus-elite language and host ideologies remain difficult measurement problems.
- The supplied article references supplementary analyses and footnotes not reproduced in full in the parsed Markdown; the summary uses the main-text evidence.

## Related Concepts

- [[concepts/data-quality-assessment|Data Quality Assessment]]: Content checks and audits of data production complement convergent validity; shared information can produce agreement without a valid construct measure.
- [[concepts/populism-and-ultranationalism|Populism and Ultranationalism]]: Populist people-versus-elite claims must remain distinct from host ideologies and national exclusion.

## Related Papers

- [[papers/how-populist-are-parties|How Populist Are Parties?]]: The specific measurement procedure reanalyzed here.
- [[papers/assessing-data-quality-an-approach-and-an-application|Assessing Data Quality: An Approach and An Application]]: Cited framework for combining different forms of measurement validation.
- Dai and Kustov (2022), “When Do Politicians Use Populist Rhetoric?”: Cited example using manually coded paragraphs and word embeddings rather than inherited party labels.

Published in *Political Analysis* 31, 591–605. [Article](https://doi.org/10.1017/pan.2022.32). [Replication data](https://doi.org/10.7910/DVN/DDXRXI).

Source: supplied parsed Markdown. Ingest job: `1a1c47ed-0d17-4f34-b841-90f07e7376bb`.
