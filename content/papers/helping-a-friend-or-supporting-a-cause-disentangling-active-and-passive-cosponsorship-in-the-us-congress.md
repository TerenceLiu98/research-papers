---
title: "Helping a Friend or Supporting a Cause? Disentangling Active and Passive Cosponsorship in the U.S. Congress"
type: paper
authors:
  - Giuseppe Russo
  - Christoph Gote
  - Laurence Brandenberger
  - Frank Schweitzer
year: 2023
source_job_id: "f38196db-f3e1-4d8c-9797-ed118476eb4f"
tags:
  - legislative-politics
  - political-networks
  - representation-learning
  - text-as-data
---

## TL;DR

A text encoder and relational graph convolutional network distinguish active from passive congressional cosponsorship with mean F1 0.884. Active cosponsors have representations closer to bill sponsors, while passive cosponsors are closer to bill content. The authors interpret this as colleague support versus policy support; embedding associations do not independently establish legislators' motivations.

## Research Question

Do cosponsorship signatures recorded at bill introduction and those added afterward express different forms of support, and can text and legislative relations distinguish them?

## Motivation

Treating all [[concepts/legislative-cosponsorship-networks|Legislative Cosponsorship Networks]] alike can conflate interpersonal collaboration with support for an agenda. Timing offers an operational distinction: active signatures are recorded at introduction, whereas passive signatures follow introduction.

## Contributions

- Combines bill texts, speeches, legislator metadata, sponsorship, cosponsorship, citations between legislators, and roll-call votes for the 112th–115th Congresses.
- Aggregates BERT chunk representations with a bidirectional LSTM for long documents.
- Learns legislator representations through joint cosponsorship, speech-authorship, and citation prediction.
- Tests representation similarity, party separation, and transfer to roll-call prediction.

## Method

Separate encoders process bill texts and speeches using BERT, a bidirectional LSTM, and mean pooling. A heterogeneous graph contains legislator, speech, and bill nodes, connected by speech authorship, directed citations, sponsorship, active cosponsorship, and passive cosponsorship. Legislator nodes begin with metadata encodings; document nodes begin with text embeddings.

A classifier concatenates the cosponsor, sponsor, and bill embeddings to predict active versus passive status **conditional on an observed cosponsorship**. It does not predict whether an arbitrary legislator will cosponsor. The joint objective weights cosponsorship loss by 0.8 and each auxiliary loss by 0.1. Appendix A specifies two graph convolution layers, although Section 3.2 describes three.

## Experiments

The paper reports over 50,000 bills, 120,000 speeches, and 1.5 million votes. Within each Congress, the first 60% of time supplies training data, the next 20% validation, and the final 20% testing (Appendix A).

| Evaluation | Reported F1 |
| --- | --- |
| Active/passive classification, full model | 0.884 ± 0.04 |
| Text encoder alone | 0.846 ± 0.03 |
| RGCN baseline | 0.800 ± 0.05 |
| Full architecture, cosponsorship loss only | 0.853 |
| Roll-call prediction, representations + FFNN | 0.907 |
| Roll-call prediction, LSTM + GCN baseline | 0.896 |

Tables 1 and 8 support the benefits of combining text, relations, and auxiliary objectives. Cosine-similarity comparisons associate active signatures with sponsors and passive signatures with bills. A t-SNE visualization separates parties and places conservative Democrats between party clusters; this is qualitative evidence about representations, not a direct ideology measurement.

Roll-call evaluation excludes legislator–bill pairs where the voter cosponsored the bill. Although the introduction and conclusion call this zero-shot prediction, Appendix D.5 explicitly trains a three-layer FFNN on learned representations. The defensible description is transfer of representations learned without voting supervision to a trained voting classifier. The approach trails LSTM + GCN in the 115th Congress (0.895 versus 0.903), despite a higher cross-Congress average.

## Limitations

- Motives are inferred from learned similarities rather than observed or causally identified; ideology is latent and lacks ground truth.
- Legislators with fewer than eight speeches obtain mean F1 0.758, compared with the reported overall per-legislator mean of 0.889. Newly elected legislators without legislative records cannot be represented adequately.
- Generalization beyond the studied U.S. Congresses and to other forms of support is untested.
- The supplied text contains unresolved reporting discrepancies: graph depth, authorship sampling probabilities (50% in the main text versus 30% in Appendix C), speech lengths, and bill inclusion rules differ across sections. Appendix B narrows inclusion to bills with more than ten cosponsors and lists House resolution categories, unlike the broader main-text description. Malformed extracted significance values are not reproduced here.

## Related Concepts

- [[concepts/legislative-cosponsorship-networks|Legislative Cosponsorship Networks]]
- [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]] — an alternative approach to measuring ideology from language.

## Related Papers

- [[papers/text-based-ideal-points|Text-Based Ideal Points]] — cited work estimating ideology from text rather than the joint legislative graph.

[[index|Library home]]

Source note: This summary uses the supplied parsed manuscript only. The year follows its ACL 2023 checklist; no publication identifier is supplied in the extracted text.
