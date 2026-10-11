---
title: "Pretraining Language Models on Historical Text"
type: paper
authors:
  - Xiaoxi Luo
  - Zachary Shinnick
  - Niclas Griesshaber
  - Yixuan Wang
  - Junchi Yu
  - Freda Shi
  - Philip Torr
  - Yao Lu
year: null
tags:
  - historical-language-models
  - temporal-leakage
  - pretraining
  - instruction-tuning
---

## TL;DR

TYPEWRITERLM is a 7.24B-parameter language model pretrained on approximately 54B tokens of historical English with an intended 1913 cutoff. The paper combines archival text cleaning with instruction tuning whose response vocabulary is grounded in historical passages. It reports useful language and instruction-following capabilities, but its event-recall tests still detect post-cutoff knowledge. A historical training cutoff and increased surprise at later events do not establish freedom from leakage.

## Research Question

Can a capable language model be trained under an early historical knowledge cutoff, preserve that boundary during instruction tuning, and be evaluated separately for task competence and temporal fidelity?

## Motivation

Modern models can import contemporary language, values, and knowledge of subsequent outcomes into historical analysis. This creates lookahead bias when apparent forecasting or historical reasoning relies on information unavailable at the simulated date. Historical models also face scarce, noisy OCR data, possible contamination from later annotations, and evaluation benchmarks written in modern language.

## Contributions

- TYPEWRITERCORPUS: 53.986B tokens after cleaning, drawn from digitized books and smaller parliamentary, scientific, legal, literary, and dialogue corpora.
- TYPEWRITERLM: a 7.24B-parameter base model trained for roughly 140B tokens, or 2.59 corpus epochs, with a corpus-trained tokenizer.
- HISTORY-LIMA and HISTORY-SELFINSTRUCT: instruction datasets with historical response grounding, used to train two LoRA variants.
- HISTORY-EVENT: 2,344 events from 1700 through 2025 for surprisingness evaluation, with a filtered 1,726-question recall subset.
- A comparison of original, topic-filtered, and historically rewritten HellaSwag examples that probes temporal mismatch in benchmark language.

## Method

### Historical pretraining

The target corpus window is 1700-1913. Institutional Books contributes 97.68% of tokens; British Library Books contributes 1.69%, and the remaining sources provide smaller amounts of genre diversity. Cleaning removes OCR fragments, conservatively joins split words, and filters library provenance, URLs, HTML artifacts, and editorial metadata. These heuristic filters mitigate rather than guarantee elimination of modern additions (Sections 3.1-3.2; Appendix A.1).

The model follows the Llama 3 decoder architecture with 32 layers, grouped-query attention, RMSNorm, rotary embeddings, and an 8,192-token context. A custom 32,000-token BPE vocabulary is learned from the historical corpus. Pretraining uses AdamW and bfloat16 (Section 3.3; Appendix A.2).

### Historically grounded instruction tuning

Under [[Lexically Grounded Instruction Tuning]], a response is accepted only when its lexical items come from the source passage plus a small function-word allowlist; numerals must occur in the passage. A verifier permits limited source-derivable morphological and OCR corrections. This is a vocabulary constraint, not a proof that the response preserves the passage's meaning.

HISTORY-LIMA contains 1,000 single-turn examples, extended to 1,030 with 30 dialogues. Modern models participate in candidate ranking and instruction generation, followed by human review. HISTORY-SELFINSTRUCT trains a historical answer-to-question generator on the seed examples and retains 287,860 judged pairs, while responses remain historical anchors. Thus the workflow restricts modern response supervision but still uses modern model assistance. LoRA tuning uses rank 64 and alpha 128, with 15 epochs for LIMA and one for Self-Instruct (Section 4; Table 7).

### Temporal evaluation

HISTORY-EVENT measures [[Temporal Leakage in Language Models]] using both likelihood and recall. Event descriptions and their years are scored in bits per byte:

$$
\mathrm{BPB}=\frac{\mathrm{NLL}_{\mathrm{nats}}}{\ln(2)\,|\mathrm{target}|_{\mathrm{bytes}}}.
$$

The conditioning prefix is excluded from scoring. For recall, descriptions containing four-digit years are removed, then only questions correctly answered by Gemini-3.1-Flash-Lite are retained. The same model supplies reference answers and judges historical-model responses. Strict recall requires the correct year and information beyond the supplied description; relaxed recall requires only the additional correct information. Post-cutoff successes are treated as evidence of leakage (Section 5.1; Appendix C).

## Experiments

Table 2 reports TYPEWRITERLM base accuracy of 41.3% on ARC-Easy and 27.1% on ARC-Challenge, above the smaller historical baselines but below Talkie-1930's 56.1% and 35.6%. GPT2-XL obtains 50.8% and 27.9%. HellaSwag reporting is inconsistent: Table 2 gives TYPEWRITERLM 39.0%, while Table 6 gives 35.9% on the original set and 39.0% on the rewritten set.

Table 3 reports the following recall percentages for 563 pre-cutoff and 1,163 post-cutoff questions per TYPEWRITERLM variant:

| Variant | Pre-cutoff strict | Pre-cutoff relaxed | Post-cutoff strict | Post-cutoff relaxed |
| --- | ---: | ---: | ---: | ---: |
| LIMA | 5.1 | 22.6 | 0.0 | 0.3 |
| Self-Instruct | 6.2 | 25.4 | 0.0 | 0.6 |

These displayed variants have zero strict leakage in Table 3, but Appendix C.5 presents strict leakage examples for an `ep10` checkpoint, and the narrative reports up to 0.2% strict leakage among the two largest models. These statements should not be collapsed into a single rate for the final variants. The base model's BPB rises from 1.282 before the cutoff to 1.727 afterward (Table 8), illustrating that an aggregate likelihood shift can coexist with specific leakage cases.

On 388 historically filtered AlpacaEval prompts, LIMA wins 43.4% of comparisons against GPT-1900 and Self-Instruct wins 45.1%; both remain below 50% (Table 4). On IFEval, Self-Instruct reaches 11.7% strict prompt-level and 23.1% strict instruction-level accuracy, versus LIMA's 7.0% and 15.7% (Table 5).

For temporal benchmark adaptation, topic filtering retains 5,362 HellaSwag examples, and rewriting yields 2,048 examples. Table 6 reports TYPEWRITERLM accuracy of 35.9%, 36.5%, and 39.0% on original, filtered, and rewritten data. Qwen3-4B declines from 68.4% to 53.8% between original and rewritten data. These results suggest sensitivity to historical language style, but the changing example sets and model-generated rewrites do not isolate style alone.

## Limitations

- Temporal leakage remains detectable. OCR metadata, prefaces, and footnotes can introduce later information even in ostensibly historical documents.
- Lexical grounding restricts vocabulary without establishing semantic fidelity or excluding modern framing in instructions and selection decisions.
- Corpus composition is highly imbalanced, and the paper does not systematically vary source mixtures or data-efficient training strategies. One English archival corpus cannot represent all populations or a universal 1913 worldview.
- Recall evaluation depends on modern-model filtering, reference answers, and judging; events are unevenly distributed over time. A zero detected rate in a finite benchmark is not proof of a leakage-free model.
- The supplied text has unresolved reporting discrepancies: HellaSwag values differ across Tables 2 and 6; Table 8 labels TYPEWRITERLM as 8B despite the 7.24B specification; strict-leakage summaries mix checkpoints; several Table 5 loose scores are lower than the corresponding strict scores without explanation.
- Historical training can reproduce offensive attitudes. Humanities and social-science applications are proposed uses, not validated evidence that the model faithfully represents historical people or predicts counterfactual outcomes.

## Related Concepts

- [[Temporal Leakage in Language Models]]
- [[Lexically Grounded Instruction Tuning]]
- [[Validity Boundaries for LLM Social Simulations]]

## Related Papers

- [[LLM-Based Social Simulations Require a Boundary]] provides a complementary validity framework: this paper's temporal-fidelity concerns add a distinct condition alongside population and behavioral fidelity. This is a Wiki-level connection, not a citation asserted by the source.
- The source discusses Levine, Duvenaud, and Radford's *Introducing Talkie: A 13B Vintage Language Model from 1930* (2026) as a larger historical-model comparator, and Sarkar and Vafa's *Lookahead Bias in Pretrained Language Models* (2025) as motivation for temporal controls.

Source note: Synthesized from the supplied parsed Markdown for Cognitio job `46e4273b-c784-462f-b131-dfc6c6e200e5`. The text does not explicitly identify this paper's publication year, venue, DOI, or arXiv identifier; these are left unspecified.

[[index|Library home]]
