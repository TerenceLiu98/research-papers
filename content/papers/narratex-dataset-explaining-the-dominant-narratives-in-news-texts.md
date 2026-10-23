---
title: "NarratEX Dataset: Explaining the Dominant Narratives in News Texts"
type: paper
authors:
  - Nuno Guimarães
  - Purificação Silvano
  - Ricardo Campos
  - Alípio Jorge
  - Ana Filipa Pacheco
  - Dimitar Iliyanov Dimitrov
  - Nikolaos Nikolaidis
  - Roman Yangarber
  - Elisa Sartori
  - Nicolas Stefanovitch
  - Preslav Nakov
  - Jakub Piskorski
  - Giovanni Da San Martino
year: null
tags:
  - narrative-classification
  - explanation-generation
  - multilingual-nlp
  - news-analysis
  - dataset
---

## TL;DR

NarratEX pairs 1,056 news articles in Bulgarian, English, Portuguese, and Russian with curated dominant-narrative labels, sub-narrative labels, and short human-written explanations. The corpus covers the Ukraine-Russia War and climate change and enables both explanation generation and dominant-narrative inference from explanations. Baselines show that both tasks remain difficult: explanation scores are sensitive to language compliance and automatic metrics, while the strongest reported full-data narrative-inference baseline reaches accuracy between 0.470 and 0.632 across languages.

## Research Question

Can a multilingual news dataset connect document-level narrative categories to concise human rationales closely enough to support both generating [[concepts/dominant-narrative-explanation|dominant-narrative explanations]] and recovering narrative labels from those explanations?

## Motivation

Existing narrative resources often support reading comprehension, causal reasoning, summarization, or propaganda-technique detection without directly explaining why a document received a narrative label. NarratEX treats categorization and explanation as a paired problem. This is especially relevant when closely related narratives co-occur and when interpreting political or manipulative discourse requires attention to stance rather than topic words alone.

## Contributions

- Releases a multilingual corpus of 1,056 news articles with a dominant narrative, a sub-narrative, and a curator-selected explanation for each article.
- Covers Bulgarian, English, Portuguese, and Russian across two topic-specific taxonomies: the Ukraine-Russia War and climate change.
- Documents dual annotation, evidence highlighting, language-team coordination, and expert curation.
- Defines two benchmark tasks: generating an explanation from an article and its labels, and inferring one of 21 dominant narratives from an explanation.
- Compares random, zero-shot generative, and fine-tuned multilingual baselines and supplements automatic explanation scoring with English-only human evaluation.

## Method

Articles published from January 2022 through August 2024 were retrieved with topic-specific queries, ranked using zero-shot relevance and persuasion-technique scores, filtered to at least 250 words, and manually screened. The resulting collection is purposefully selected for relevant narratives and is not intended to represent general news coverage.

Each language had a dedicated team of trained annotators and a coordinator. Two annotators independently selected a document-level dominant narrative and sub-narrative from topic-specific taxonomies, highlighted supporting passages, and wrote an explanation of at most 80 words in the article's language without simply repeating the labels. Curators then validated the labels and selected, merged, or rewrote the final explanation. The final split contains 945 training and 111 test documents. Russian has no climate-change subset because the collection process did not find suitable Russian-language articles for that topic and period.

Before curation, dominant-label Krippendorff's alpha is 0.540 for Bulgarian, 0.409 for English, 0.332 for Portuguese, and 0.338 for Russian. Sub-narrative alpha is lower: 0.486, 0.353, 0.299, and 0.302, respectively. These coefficients describe the difficulty of the pre-curation annotation task, not the accuracy of the final labels. Explanation similarity between annotators who agreed on the dominant narrative ranges from 0.691 to 0.749 BERTScore F1 across reported language-topic pairs.

## Experiments

### Explanation Generation

Given an article and its dominant and sub-narrative labels, Llama 3.1 8B Instruct, Phi-3 Small 8K Instruct, Gemma 2 2B Instruct, Gemini 1.5 Flash, and Gemini 1.5 Pro generate an explanation of at most 80 words. A random baseline extracts 80 consecutive document tokens. Evaluation uses multilingual BERTScore on the test set and full corpus.

Best test-set BERTScore F1 is 0.669 for Portuguese (Phi-3), 0.669 for English (Gemini 1.5 Flash), 0.644 for Russian (Phi-3), and 0.649 for Bulgarian (Phi-3). Several models answer in English when instructed to use Portuguese or Bulgarian, and the random baseline is competitive with or exceeds some zero-shot systems on the full data. These results therefore measure a mixture of explanation quality, language compliance, and similarity to one reference.

One annotator also scores English test outputs on a five-point similarity scale. Gemini 1.5 Pro leads with a mean of 3.90, followed by Llama 3.1 at 3.33; Phi-3 scores 2.63. Qualitative analysis finds that BERTScore can reward shared vocabulary despite reversed stance or missing central arguments, and can undervalue valid paraphrases.

### Narrative Inference

Given an explanation and all 21 possible dominant narratives, systems predict one label without being told the topic. The comparison includes a random classifier, Gemini 1.5 Flash, Llama 3.1, Phi-3, and a multilingual BERT model fine-tuned for three epochs.

On the test set, the highest reported accuracies are 0.720 for Portuguese (a tie between Gemini and fine-tuned BERT), 0.500 for English (a three-way tie among the generative models), 0.571 for Russian (fine-tuned BERT), and 0.607 for Bulgarian (Gemini). On the full corpus, where the fine-tuned model is not evaluated, Gemini leads every language with accuracy of 0.632, 0.536, 0.553, and 0.470 for Portuguese, English, Russian, and Bulgarian. Macro-F1 is substantially lower than accuracy, reflecting uneven performance across the imbalanced narrative classes.

## Limitations

- The corpus covers only two topics and four languages, and Russian climate-change articles are absent. Topic, language, source, and narrative distributions are not representative or balanced.
- Narrative selection and explanation writing are subjective. Low pre-curation agreement and recurrent confusion among related labels make curator decisions part of the benchmark's operational definition.
- The 21 dominant narratives and 74 sub-narratives are analyst-built, topic-specific taxonomies and are not claimed to exhaust possible narratives.
- Human evaluation covers only English test examples and uses one annotator, so it cannot validate explanation quality across languages.
- BERTScore may miss stance, argumentative emphasis, and polarity; the paper's own error analysis shows disagreement between lexical-semantic similarity and human judgment.
- Full-corpus zero-shot results are not directly comparable to the held-out evaluation of fine-tuned BERT. Model versions, prompt choices, truncation, class imbalance, and failures to follow the requested language also constrain the baselines.
- Dataset access is subject to terms and conditions, and the authors identify misuse risks such as improving manipulative messaging or amplifying biased narratives.
- The supplied Markdown does not state a publication year, venue, or stable paper identifier.

## Related Concepts

- [[concepts/dominant-narrative-explanation|Dominant Narrative Explanation]]
- [[concepts/causal-micro-narrative-classification|Causal Micro-Narrative Classification]]: also uses an expert taxonomy to classify narratives, but focuses on sentence-level causal accounts rather than document-level stance explanations.
- [[concepts/narrative-polarization|Narrative Polarization]]: studies separation between communities' narrative repertoires rather than assigning and explaining a single dominant document narrative.
- Inter-annotator agreement
- Multilingual text classification

## Related Papers

- Camburu et al. (2018), "e-SNLI: Natural Language Inference with Natural Language Explanations": cited as a precedent for pairing labels with human justifications.
- Nikolaidis et al. (2025), "PolyNarrative: A Multilingual, Multilabel, Multi-domain Dataset for Narrative Extraction from News Articles": supplies the narrative definition adopted by NarratEX.
- Schmitt et al. (2024), "The Role of Explainability in Collaborative Human-AI Disinformation Detection": motivates explainability in misinformation analysis.
- [[papers/causal-micro-narratives|Causal Micro-Narratives]]: a library comparison using fine-grained causal narrative labels in news.
- [[papers/measuring-narrative-polarization-in-online-discourse|Measuring Narrative Polarization in Online Discourse]]: a library comparison that operationalizes narrative repertoires and polarization in online comments.

[[index|Library home]]
