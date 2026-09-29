---
title: "Structured, Complex and Time-complete Temporal Event Forecasting"
type: paper
authors:
  - Yunshan Ma
  - Chenchen Ye
  - Zijian Wu
  - Xiang Wang
  - Yixin Cao
  - Liang Pang
  - Tat-Seng Chua
year: null
source_job_id: "f7b0add9-ee5a-4aa4-a291-213e8471dc96"
tags:
  - event-forecasting
  - temporal-knowledge-graphs
  - complex-events
  - information-extraction
---

## TL;DR

The paper represents complex events as sequences of timestamped relational graphs and introduces LoGo, which combines histories within a complex event with a global event history. On two news-derived benchmarks, Table 4 reports MRR of 0.2533 on GDELT-TE and 0.4978 on MidEast-TE, versus 0.1641 and 0.3354 for HisMatch. These are conditional entity-ranking results on noisy extracted events; they do not establish reliable open-ended geopolitical forecasting.

## Research Question

Can event representations preserve relational structure, complex-event membership, and explicit timestamps simultaneously, and can combining local and global histories improve next-step object prediction?

## Motivation

Standard temporal knowledge graphs encode atomic events but do not explicitly group them into evolving complex events. Schema-based complex-event graphs capture relationships among events, but may retain only incomplete pairwise temporal relations. The proposed formulation assigns both a timestamp and a complex-event identifier to every atomic event. Local history can focus prediction on a particular developing situation, while global history supplies contextual information beyond that situation (Sections 1-2).

## Contributions

- Defines structured, complex, and time-complete temporal events (SCTc-TE) as chronological sequences of relational graphs.
- Constructs MidEast-TE and GDELT-TE using temporal document clustering, with LLM-based extraction for MidEast-TE and original GDELT extraction for GDELT-TE.
- Introduces LoGo, using separate relational graph and recurrent encoders for local and global histories, followed by representation fusion and entity ranking.
- Evaluates forecasting, context and fusion ablations, and selected aspects of dataset construction quality.

## Method

### Representation and Task

Each atomic event is a quintuple $(s,r,o,t,c)$: subject, relation, object, timestamp, and complex-event identifier. A complex event is a sequence $\mathbf{G}^c=[G_1^c,\ldots,G_t^c]$. Given histories through $t$ and a query $(s,r,?,t+1,c)$, the model ranks candidate objects. Subject, relation, future timestamp, and complex-event membership are supplied; predicting those fields is outside this task. See [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]].

### Dataset Construction

The source corpus comprises GDELT-linked news concerning Egypt, Iran, and Israel from 2015-02-19 through 2022-03-17. Filtering to accessible articles from 69 high-volume news sources leaves 586,691 articles before event-based filtering (Appendix A.1).

SimCSE-tuned RoBERTa embeds the title and first 512 tokens of each document. UMAP reduces dimensionality, and HDBSCAN clusters representations augmented with a weighted temporal feature. Temporal weighting permits variable-duration clusters. Oversized clusters are split, and clusters with fewer than ten atomic events or shorter than two days are removed.

For MidEast-TE, 8-bit Vicuna-13b extracts subject-relation-object triples hierarchically through the CAMEO ontology using titles and the first three paragraphs. The main text calls this zero-shot extraction, although the appendix's prompt includes an in-context example. GPT-4 merges entity variants in batches formed by K-means, followed by manual checking and correction. Duplicate triples within the same day and complex event are merged. Publication date supplies the daily timestamp. Unclustered events enter the global history but are not training targets or test queries. GDELT-TE uses the same initial document clustering with GDELT's original extracted events.

### LoGo

Two separate branches apply relational graph convolution at each timestamp and a GRU over recent graph histories. The local branch processes only the query's complex event; the global branch processes all historical events, including outliers. Entity and relation embeddings and encoder parameters are separate between branches.

Corresponding local and global embeddings are added before a ConvTransE decoder scores candidate objects. Softmax scores are optimized with the stated cross-entropy objective. Embedding dimension is 200; validation MRR selects hyperparameters. Searches include history lengths of 1, 3, 5, 7, 10, or 14 steps and one to three graph-convolution layers (Section 2.3; Appendix A.2).

## Experiments

### Protocol and Data

Complex events are assigned chronologically using weighted timestamp centroids: the last year is used for testing, the preceding year for validation, and roughly five earlier years for training. Validation and test events containing unseen entities or relations are removed. Evaluation uses time-aware filtered MRR and Hits@1/3/10, with only events inside complex events scored.

| Dataset | Entities | Relations | Total atomic events, including outliers | Train / validation / test target events |
| --- | ---: | ---: | ---: | --- |
| GDELT-TE | 1,555 | 239 | 1,201,881 | 441,120 / 66,785 / 65,433 |
| MidEast-TE | 2,794 | 234 | 455,877 | 160,953 / 25,401 / 22,440 |

These values follow Tables 2-3 and 7-8. Baselines are DistMult, ConvE, ConvTransE, RGCN, RE-NET, RE-GCN, HisMatch, and CMF. Schema-guided complex-event methods are excluded because their required schemas are absent.

### Reported Forecasting Results

Table 4 identifies HisMatch as the strongest baseline on all listed metrics.

| Dataset | HisMatch MRR | LoGo MRR | Reported relative MRR gain | HisMatch Hits@1 | LoGo Hits@1 | HisMatch Hits@10 | LoGo Hits@10 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| GDELT-TE | 0.1641 | 0.2533 | 54.33% | 0.0716 | 0.1344 | 0.3652 | 0.5053 |
| MidEast-TE | 0.3354 | 0.4978 | 48.44% | 0.2226 | 0.3838 | 0.5642 | 0.6956 |

Table 5 supports combining contexts and favors early fusion. Its GDELT-TE full-model result differs from Table 4 and is kept separate here.

| Variant | GDELT-TE MRR, Table 5 | MidEast-TE MRR, Table 5 |
| --- | ---: | ---: |
| Local only | 0.2164 | 0.4230 |
| Global only | 0.1471 | 0.2920 |
| Shared branch parameters | 0.2391 | 0.4850 |
| Late fusion | 0.2082 | 0.4018 |
| Full LoGo | 0.2414 | 0.4978 |

Local-only encoding beats global-only encoding on both datasets, while the full model improves on both. Parameter separation yields smaller gains than combining contexts. CMF's textual features do not outperform the strongest purely structured baseline. Reported preferred history lengths are five steps for MidEast-TE and ten for GDELT-TE, with two and one graph-convolution layers respectively (Section 3.4).

### Extraction Quality and Cost

GPT-3.5 judgments on 100 sampled news articles yield extraction precision of 0.432 for MidEast-TE and 0.425 for GDELT-TE. This is a small, model-judged precision assessment, not human-validated coverage or recall. The appendix reports 2,282 GPU hours for extraction across the initial corpus, using eight NVIDIA A5000 GPUs. With minimum cluster size ten, adding the temporal feature reduces the reported mean cluster span from 1,682.16 to 39.25 days before subsequent cluster splitting (Table 6).

## Limitations

- **Measurement quality:** Both extraction precision estimates are low. More fine-grained entities and relation types do not by themselves establish greater factual accuracy. Publication dates are proxies for event times; "time-complete" means timestamps are assigned, not that all real events are observed or correctly dated.
- **Pipeline scope:** Semantic clustering can omit relevant but dissimilar reports, and roughly half the documents are treated as outliers. Source selection, CAMEO restrictions, and rare-actor filtering limit coverage. Despite the automation claim, Appendix A.1.4 explicitly reports manual correction of entity linking.
- **Evaluation scope:** The task conditions on known query fields and removes unseen entities and relations. It does not test cold-start forecasting or autonomous discovery of future complex events. The reported result tables provide no uncertainty estimates or significance tests.
- **Model scope:** LoGo pools all complex events into one global context without explicitly modeling relations among complex events. The authors identify fusion design and explainability as further work; qualitative case studies do not establish causal influence.
- **Reporting inconsistencies:** GDELT-TE full-model MRR is 0.2533 in Table 4 but 0.2414 in Table 5, with other metrics also differing. Table 1 lists 4,397 GDELT-TE complex events, whereas Table 3's splits and Table 8 total give 4,535. MidEast-TE document totals also differ between Table 1 (274,795) and Table 7 (253,836); Table 7's displayed document subtotals do not sum to that stated total. These discrepancies remain unresolved.
- **Intended use and metadata:** The authors restrict their conclusions to research use because of noisy events and potentially biased news coverage. The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier; these are not inferred from reference dates.

## Related Concepts

- [[concepts/structured-complex-temporal-events|Structured Complex Temporal Events]]: timestamped event groups and conditional entity forecasting.
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: constraining extracted relations with a predefined vocabulary, here CAMEO.
- [[concepts/protest-event-analysis|Protest Event Analysis]]: a related measurement perspective on the distinction between news reports and underlying political events.

## Related Papers

- Li et al. (2021), "The future is not one-dimensional: Complex event schema induction by graph modeling for event prediction": cited schema-based complex-event formulation.
- Li et al. (2021), "Temporal knowledge graph reasoning based on evolutional representation learning": RE-GCN, the encoder design precedent and a forecasting baseline.
- Li et al. (2022), "Hismatch: Historical structure matching based temporal knowledge graph reasoning": strongest baseline in Table 4.
- Ma et al. (2023), "Context-aware event forecasting via graph disentanglement": cited precursor for the regional data selection and contextual forecasting.
- [[papers/dynamic-hawkes-processes-for-discovering-time-evolving-communities-states-behind-diffusion-processes|Dynamic Hawkes Processes for Discovering Time-evolving Communities' States behind Diffusion Processes]]: a related library paper modeling event arrival intensities and counts, rather than conditional object ranking; it is not a LoGo baseline.

[[index|Library home]]
