---
title: "How Populist are Parties? Measuring Degrees of Populism in Party Manifestos Using Supervised Machine Learning"
type: paper
authors:
  - Jessica Di Cocco
  - Bernardo Monechi
year: 2022
doi: "10.1017/pan.2021.29"
tags:
  - populism
  - text-as-data
  - political-methodology
  - weak-supervision
---

## TL;DR

Country-specific random forests turn manifesto sentences into continuous party populism scores using party-level labels. Across 268 manifestos from six European countries, the resulting scores correlate 0.84 with a POPPA latent populism measure. The score measures resemblance to prototypically populist parties' language; its training labels do not establish whether individual sentences express populism.

## Research Question

Can supervised textual classification provide inexpensive, continuously valued measures of party populism across elections and countries?

## Motivation

Expert surveys and manual textual coding require substantial resources, while dichotomous party classifications obscure variation over time and degree. Manifestos offer accessible institutional statements with broadly comparable electoral purposes, although they can differ from leaders' rhetoric.

## Contributions

- A party-label-based method that avoids sentence annotation in its main specification.
- An application to 99 parties, 268 manifestos, and 243,659 sentences in Austria, France, Germany, Italy, the Netherlands, and Spain, mainly spanning 2002–2019.
- External validation against expert surveys and leader-discourse scores, with Italian checks using speeches and manually coded sentences.

## Method

The corpus combines 229 Manifesto Project documents with 39 documents from official party and government sources. Preprocessing lowercases, removes punctuation, numbers and stopwords, and stems words. Each sentence becomes a binary bag-of-words vector.

Sentences inherit positive labels from PopuList-classified parties, with Italy's Power to People additionally designated positive. Clearly nonpopulist parties supply negative labels; ambiguously classified parties are excluded from training and scored afterward. This is an instance of [[concepts/weakly-supervised-learning|Weakly Supervised Learning]]: the supervised target is source-party membership.

Each country receives a separate random forest. A 70/30 sentence split separates training/validation from testing; five-fold grid search selects hyperparameters by mean AUROC. The final model is refitted on training data, and a Youden-index threshold is selected using that training set. The party score is the fraction of evaluated manifesto sentences classified positive, rather than the mean predicted probability. Test sentences supply scores for included parties; excluded parties' sentences are also classified.

## Experiments

Table 1 reports performance against inherited party labels:

| Country | Test AUROC | Test F1 |
| --- | ---: | ---: |
| Austria | 0.77 | 0.51 |
| France | 0.80 | 0.58 |
| Germany | 0.86 | 0.51 |
| Italy | 0.89 | 0.69 |
| Netherlands | 0.81 | 0.50 |
| Spain | 0.95 | 0.80 |

CHES pooled correlations are 0.81 with anti-elite salience (95% CI 0.67–0.90) and 0.75 with its people-versus-elite item (0.57–0.87). Validation excludes Spanish regionalist parties and Italy's FI; Austria is absent from this CHES wave. The latter item concerns direct versus representative democracy and is not itself a defining populist attribute.

The POPPA comparison constructs a latent measure from five ideational dimensions using exploratory factor analysis. Its correlation with the manifesto score is 0.84 (95% CI 0.71–0.91). GPD validation has only nine overlapping parties before excluding PSOE; the reported correlation after that exclusion is 0.69. Leader speeches and party manifestos differ in both actor and genre, limiting this comparison.

In Italy, scores based on 2,151 speech sentences correlate 0.75 with manifesto scores. Training on manually coded manifesto sentences gives scores correlated 0.88 with the main method. Logistic regression, gradient boosting, and a feedforward neural network yield broadly similar Italian results, according to the supplementary analyses described in the article.

The descriptive application excludes parties below 1% of the vote. Average scores rise sharply in Italy, while other countries show weaker growth or uneven trajectories; Spain decreases. These trends do not identify causes of populism.

## Limitations

- Source-party prediction and sentence-level populism are different targets. Common wording can give nominally nonpopulist parties positive scores; Germany's training composition may understate AfD populism relative to Die Linke.
- Separate national models need not share a measurement scale. The authors propose an integrated translated corpus to improve cross-country comparability.
- Manifesto length and topic coverage are uncontrolled, and binary bag-of-words features discard context and word order.
- The split holds out sentences, not whole parties, manifestos, or future elections; consequently these test metrics do not demonstrate generalization to those held-out units.
- Contemporary party classifications anchor historical scoring. Speech and manual-coding robustness checks cover Italy only.
- The authors acknowledge possible underestimation of cross-validation variance. Supplementary material referenced in the article is not included in the supplied Markdown.

## Related Concepts

- [[concepts/weakly-supervised-learning|Weakly Supervised Learning]]: Party labels provide indirect sentence supervision; external construct validation complements proxy-label prediction.
- [[concepts/text-scaling-models|Text Scaling Models]]: Classification followed by aggregation supplies a political scale whose substantive interpretation requires validation.
- [[concepts/populism-and-ultranationalism|Populism and Ultranationalism]]: The ideational people-versus-elite construct can occur across host ideologies and does not require national exclusion.

## Related Papers

- [[papers/popbert-detecting-populism-and-its-host-ideologies-in-the-german-bundestag|PopBERT]]: Related library reading using directly annotated populist dimensions in German parliamentary sentences, contrasting with inherited party labels here.
- Rooduijn and Pauwels (2011), “Measuring Populism: Comparing Two Methods of Content Analysis”: Cited comparison of textual measurement approaches.
- Meijers and Zaslove (2020a), “Measuring Populism in Political Parties: Appraisal of a New Approach”: Supplies the five-dimensional measurement approach used in POPPA validation.

Published in Political Analysis 30, 311–327 (2022); first published online 15 October 2021. [Article](https://doi.org/10.1017/pan.2021.29). [Replication material](https://doi.org/10.7910/DVN/BMJYAN).

Source: Supplied parsed article, Sections 1–6 and Table 1. Ingest job: `5b125882-1b40-42fc-9b89-8f60d0578b98`.
