---
title: "LLMs Encode Harmfulness and Refusal Separately"
type: paper
authors:
  - Jiachen Zhao
  - Zhengxuan Wu
  - Jing Huang
  - David Bau
  - Weiyan Shi
year: null
source_job_id: "de726ef3-bfdc-48b1-bcd0-c565f3889b8a"
tags:
  - llm-safety
  - mechanistic-interpretability
  - activation-steering
  - refusal
  - jailbreak-defense
---

## TL;DR

The paper argues that instruction-tuned language models encode an input's harmfulness separately from the decision to refuse it. Across Llama 2, Llama 3, and Qwen 2 models, hidden states at the last instruction token separate harmful from harmless prompts, while states after chat-template tokens more closely separate refused from accepted prompts. Activation steering and a reply-inversion task provide causal evidence for this distinction. The resulting Latent Guard classifies prompts from the model's harmfulness representation and performs well on several jailbreak and misbehavior sets, but its out-of-domain performance can be poor without in-domain examples.

## Research Question

Do instruction-tuned LLMs represent the harmfulness of a request independently of their behavioral refusal signal, and can that internal distinction support more robust input safeguarding?

## Motivation

Refusal behavior is an imperfect proxy for safety understanding: models may accept harmful prompts after a jailbreak or refuse harmless prompts containing suspicious words. Earlier work identified a low-dimensional refusal direction at the final input position, but that direction could encode the response policy rather than the model's assessment of harm. Distinguishing the two matters both for mechanistic claims and for safeguards that should remain useful when refusal behavior fails.

## Contributions

- Distinguishes a harmfulness representation at the final user-instruction token from a refusal representation after the prompt's post-instruction template tokens.
- Shows that accepted harmful prompts remain close to the harmful cluster and refused harmless prompts remain close to the harmless cluster at the instruction endpoint, even when behavior disagrees.
- Uses activation addition and a reply-inversion task to show that harmfulness-direction steering changes the model's harm judgment, whereas refusal-direction steering primarily changes the surface response.
- Reports that harmfulness directions differ more across risk categories than refusal directions, suggesting more category-specific internal structure for harm.
- Uses the representation to analyze jailbreaks and proposes Latent Guard, a centroid-based classifier computed during the model's normal forward pass.

## Method

The analysis compares residual-stream activations at two positions: $t_{inst}$, the last token of the user's instruction, and $t_{post-inst}$, the last special token added by the model's chat template. For each layer, the authors form centroids from refused harmful and accepted harmless instructions. A cosine-similarity difference measures whether a held-out activation lies closer to the harmful/refused cluster or the harmless/accepted cluster.

At $t_{inst}$, the harmfulness direction is the difference between mean activations for harmful and harmless instructions. At $t_{post-inst}$, an analogous difference between refused and accepted instructions defines the refusal direction. The paper applies these directions through activation addition. Its reply-inversion task asks the model whether the original prompt could cause harm and maps harmful judgments to an affirmative token and harmless judgments to a negative token. This reverses the ordinary association between harmful inputs and refusal, allowing the two intervention effects to be separated behaviorally.

Latent Guard classifies a prompt by whether its instruction-end activation is closer to the harmful or harmless centroid. The reported implementation uses 100 harmful and 100 harmless examples to construct the centroids and requires no separately fine-tuned guard model.

## Experiments

Experiments use Llama-2-Chat-7B, Llama-3-Instruct-8B, and Qwen2-Instruct-7B. Harmful examples come from AdvBench, JailbreakBench, and Sorry-Bench; harmless examples come from Alpaca and XSTest. Removing post-instruction template tokens lowers harmful-prompt refusal from 100.0% to 85.3% for Llama 2, 96.0% to 58.9% for Llama 3, and 98.0% to 81.3% for Qwen 2.

The clustering analysis finds that accepted harmful and refused harmless cases group by prompt harmfulness at $t_{inst}$ but by model behavior at $t_{post-inst}$. Harmfulness and refusal belief scores remain positively correlated for ordinary cases, yet diverge on these failures. Steering harmless prompts along the harmfulness direction reaches 94% refusal on Llama 3 at layer 9, while refusal-direction steering reaches 100% at layer 11; the directions have low cosine similarity. In the reply-inversion task, harmfulness steering flips the model's stated harm judgment, while refusal steering generally preserves the refusal-style token, supporting different causal roles.

Latent Guard is evaluated on adversarial suffixes, persuasive jailbreaks, adversarial templates, refused harmless prompts, and accepted harmful prompts. It matches or exceeds Llama Guard 3 8B on many reported model-dataset combinations; for example, on Qwen 2 persuasion prompts it scores 75.0% versus 17.8% for Llama Guard 3. After adversarial fine-tuning on 50 to 400 examples, the tested models increasingly accept harmful prompts while their measured harmfulness belief changes little.

The appendix provides an important qualification. On ToxicChat, Latent Guard's safe/unsafe accuracies vary sharply by backbone, and on the OpenAI Moderation evaluation its Qwen 2 and Llama 3 variants perform poorly without in-domain examples. Adding 50 category-matched harmful examples substantially improves those results. The authors attribute this sensitivity to taxonomy and domain coverage rather than treating the latent classifier as universally generalizable.

## Limitations

- The detailed experiments cover three 7B-8B instruction-tuned model families; the claims are not established for larger, closed, multilingual, or substantially different architectures.
- Token-position conclusions depend on each model's chat template. Removing template tokens changes the input distribution as well as the location at which refusal is measured.
- Difference-in-means directions and centroid classification impose a linear, largely binary account of harmfulness even though the category experiments show finer-grained structure.
- The reply-inversion prompt must be adapted across models because smaller models sometimes answer the original request instead of the meta-level question.
- Refusal rate is mostly determined by matching fixed substrings, and the inversion experiments use specific tokens such as "No" and "Certainly"; these operationalizations can miss semantically equivalent behavior.
- The jailbreak and fine-tuning analyses cover selected attacks. Robustness to 50-400 constructed adversarial examples does not establish robustness to broader or representation-targeted fine-tuning.
- Latent Guard is sensitive to distribution shift and taxonomy coverage. Its weak out-of-domain results improve after adding labeled in-domain examples, limiting the claim that it is an intrinsic, training-free replacement for a broadly trained guard model.
- The supplied manuscript does not state a stable paper identifier or publication year, so those metadata remain unset.

## Related Concepts

- [[concepts/latent-harmfulness-and-refusal-representations|Latent Harmfulness and Refusal Representations]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

References discussed in the supplied paper:

- Arditi et al. (2024), "Refusal in Language Models Is Mediated by a Single Direction": establishes the refusal-direction result that this paper separates from harmfulness.
- Turner et al. (2023), "Steering Language Models with Activation Engineering": provides the activation-addition intervention framework.
- Rottger et al. (2023), "XSTest: A Test Suite for Identifying Exaggerated Safety Behaviours in Large Language Models": supplies over-refusal cases used to test disagreement between harm assessment and refusal.
- Inan et al. (2023), "Llama Guard: LLM-Based Input-Output Safeguard for Human-AI Conversations": provides the dedicated guard-model comparison.
- Zou et al. (2023), "Universal and Transferable Adversarial Attacks on Aligned Language Models": supplies adversarial suffix attacks and AdvBench data used in the jailbreak analysis.

Related library reading, without implying citation by this paper:

- [[papers/when-truthful-representations-flip-under-deceptive-instructions|When Truthful Representations Flip Under Deceptive Instructions?]] also compares internal representations with output behavior under an instruction-induced behavioral change.

[[index|Library home]]
