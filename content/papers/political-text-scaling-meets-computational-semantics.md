---
title: Political Text Scaling Meets Computational Semantics
type: paper
authors:
  - Federico Nanni
  - Goran Glavaš
  - Ines Rehbein
  - Simone Paolo Ponzetto
  - Heiner Stuckenschmidt
year: 2022
doi: "10.1145/3485666"
venue: ACM/IMS Transactions on Data Science
tags:
  - text-as-data
  - political-text-scaling
  - semantic-representations
  - european-parliament
---

## TL;DR

SemScale combines weighted word embeddings with graph-based label propagation to estimate political positions without labeled reference texts. On European Parliament speeches in five languages and two legislative terms, it correlates more strongly with expert EU-integration positions than Wordfish: Pearson correlations are 0.32 versus 0.15 and 0.29 versus 0.16. Gains depend on representation, genre, and temporal context: Wordfish beats default SemScale on manifesto left-right scaling, while a Party2Vec variant improves single-election results.

## Research Question

Can semantic document representations improve unsupervised political text scaling over word-frequency models, and how much do the results depend on linguistic preprocessing, representation, graph algorithm, genre, and minimal supervision?

## Motivation

Lexical overlap can miss similar positions expressed with different words. It can also confuse opposing positions expressed with similar vocabulary. The paper addresses the first problem through distributional semantics; it does not claim to solve the second. Its modular design separates document representation from scaling, allowing the contribution of each to be examined.

## Contributions

- Introduces SemScale, a deterministic scaling procedure conditional on fixed input texts and word embeddings.
- Builds a parallel five-language European Parliament benchmark spanning 1999-2009, with party-level documents and expert-position comparisons.
- Separately examines linguistic filtering, sparse versus dense representations, graph algorithms, manifesto scaling, and semantic grouping of Wordfish inputs.
- Extends the method to SemScores, which uses two known extreme reference texts, and reports release of code, datasets, preprocessing variants, and scaling outputs.

## Method

### Semantic representation and graph scaling

For each document, SemScale aggregates word embeddings with TF-IDF weights (Section 3):

$$
e(T)=\frac{1}{|T|}\sum_{w\in T}\operatorname{tfidf}(w,T)e(w).
$$

TF is normalized by the largest word count in the document; IDF is the logarithm of corpus size divided by document frequency. Pairwise cosine similarities form a fully connected weighted document graph. The least similar document pair supplies the two pivots, assigned scores +1 and -1. With graph Laplacian $L=D-W$, harmonic function label propagation gives the remaining scores:

$$
f_u=-L_{uu}^{-1}L_{ul}y_l,\qquad y_l=[1,-1]^\top.
$$

The orientation and substantive meaning of the resulting axis require external interpretation. Unsupervised here means that pivot labels are assigned automatically; the propagation algorithm itself is a semi-supervised learning method. Sparse TF-IDF vectors and Party2Vec document embeddings can replace averaged word embeddings without changing the graph-scaling procedure. SemScores instead uses two externally identified extreme reference texts and their positions.

### Data and evaluation

The parliamentary corpus retains speeches originally delivered in English, German, French, Italian, or Spanish and translated into all four other languages. Speeches are pooled by national party within each term: 31 parties in 1999-2004 and 26 in 2004-2009. Average English document lengths are 160K and 106K words, respectively (Table 1). This selection differs from the earlier Proksch-Slapin corpus.

Positions are compared with the 2002 and 2006 Chapel Hill Expert Surveys using pairwise accuracy (PA), Pearson correlation, and Spearman correlation, averaged across languages. The baseline is Quanteda Wordfish with default parameters and minimum document frequency five for speeches, two for manifestos. Main comparisons remove stopwords and punctuation without stemming or lemmatization. Linguistic-filtering experiments give both methods the same text subset; the study uses spaCy and FastText for linguistic processing and word representations.

## Experiments

### Parliamentary speeches

Table 2 reports the following language-averaged results against EU-integration positions. Parentheses are the paper's reported standard errors.

| Term | Method | PA | Pearson | Spearman |
| --- | --- | --- | --- | --- |
| Fifth | Wordfish | 0.54 (0.01) | 0.15 (0.04) | 0.12 (0.03) |
| Fifth | SemScale | 0.60 (0.02) | 0.32 (0.03) | 0.27 (0.05) |
| Sixth | Wordfish | 0.53 (0.03) | 0.16 (0.06) | 0.09 (0.09) |
| Sixth | SemScale | 0.59 (0.02) | 0.29 (0.03) | 0.27 (0.06) |

Broad left-right alignment is weaker: SemScale's Pearson correlations are 0.22 and 0.11, and its Spearman correlations are 0.05 and 0.10 (Table 3). Improved integration scaling therefore does not establish general ideological recovery.

### Component checks and transfer

- **Linguistic filtering:** person-name-only SemScale raises EU-integration Pearson correlation to 0.38 and 0.49. Verb-only input helps in the fifth term but hurts in the sixth; lemmatization gives similar accuracy to unnormalized text (Section 5.1).
- **Representation:** graph scaling with sparse TF-IDF yields Pearson correlations of 0.22 and 0.20, above Wordfish but below averaged embeddings. Party2Vec yields 0.12 and 0.39, showing that its advantage changes by term (Table 6).
- **Manifestos:** five country datasets cover the UK, Germany, France, Italy, and Spain. Single-election comparisons use elections in 2015, 2013, 2012, 2013, and 2011, respectively; multiple-election comparisons use all available coded manifestos. Against Manifesto Project RILE scores, single-election PA is 0.63 for Wordfish, 0.58 for default SemScale, and 0.65 for Party2Vec SemScale. Multiple-election PA is 0.61, 0.56, and 0.59, respectively. No method wins in every country (Table 7).
- **Graph algorithm:** PageRank outperforms HFLP on sixth-term speeches but is less consistent across settings. Its Spearman correlation is 0.09 on fifth-term speeches and 0.01 on multiple-election manifestos (Tables 8-9).
- **Semantic Wordfish inputs:** grouping similar words before counting them substantially reduces vocabulary but yields only small gains; it does not reproduce SemScale's improvements (Table 10).
- **Two-reference supervision:** SemScores and Wordscores both improve on their unsupervised counterparts. SemScores exceeds Wordscores on fifth-term speeches (PA 0.70 versus 0.63), but falls slightly below it in the sixth term (0.65 versus 0.66). Single-election manifesto PA ties at 0.70; multiple-election PA favors Wordscores, 0.66 versus 0.63 (Tables 11-12).

## Limitations

Semantic similarity does not identify a policy dimension by itself. Automatic pivot selection assumes that the least similar documents define meaningful extremes; topical differences and semantic drift can instead determine the scale. The authors caution against applying SemScale across long time spans and present temporal drift as a possible explanation for weaker multiple-election performance, not an independently established mechanism.

The parliamentary evaluation covers selected, fully translated speeches from five languages and two terms with different corpus sizes. Manifestos are different texts across countries, so their country-language results do not isolate translation robustness. Chapel Hill scores reflect expert knowledge of parties, whereas RILE is derived from the manifestos themselves and has known coding and validity limitations.

Preprocessing and representation choices materially affect results, and named-entity recognition errors can change what enters the model. Averaging word embeddings addresses lexical variation but does not reliably distinguish support from opposition expressed using similar words. Determinism with fixed embeddings establishes repeatability, not measurement validity. Minimal-supervision gains depend on access to appropriate extreme references and do not establish superiority over Wordscores across settings.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: semantic similarity graphs extend the family beyond frequency-based scaling.
- [[concepts/text-embedding-models|Text Embedding Models]]: weighted word vectors and document vectors provide alternative similarity geometries.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the extracted axis must be validated against the intended political construct.

## Related Papers

- [[papers/position-taking-in-european-parliament-speeches|Position Taking in European Parliament Speeches]]: the cited parliamentary scaling design extended here with additional languages and a second legislative term.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: cited work on validating textual dimensions against human judgments and distinguishing topics from positions.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: a later library review that places SemScale within the embedding-based scaling family.

Source: [Published article](https://doi.org/10.1145/3485666), ACM/IMS Transactions on Data Science 2(4), Article 29, May 2022. Summary based on the supplied parsed article.

[[index|Library home]]
