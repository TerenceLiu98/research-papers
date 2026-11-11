---
title: Visual-Text Compression
type: concept
aliases:
  - Visual Context Compression
  - Glyph-Based Context Compression
tags:
  - long-context-modeling
  - vision-language-models
  - visual-tokenization
  - context-efficiency
---

## Overview

Visual-text compression represents text through rendered images and processes it as visual tokens. Because one visual token can cover several characters or words, this representation can increase the amount of source text handled within a fixed token budget. The technique trades exact textual fidelity for greater information density and depends on both rendering choices and the vision-language model's OCR ability.

## Key Ideas

- **Compression changes the representation rather than the context window.** The nominal model window stays fixed, but each visual token can carry more source text than a conventional text token.
- **Rendering is an optimization problem.** Resolution, font size, layout, spacing, and cropping jointly control the balance between compression and readability.
- **OCR and reasoning are coupled.** A model cannot reason reliably over details it fails to recognize, so OCR-oriented pre-training and auxiliary objectives can raise the useful compression ceiling.
- **Compression can target inputs or intermediate reasoning.** [[papers/glyph-scaling-context-windows-via-visual-text-compression|Glyph]] compresses long input contexts as page images, whereas [[papers/imgcot-compressing-long-chain-of-thought-into-compact-visual-tokens-for-efficient-reasoning-of-large-language-model|ImgCoT]] compresses rendered chains of thought into discrete visual latents.
- **Efficiency claims require end-to-end measurement.** Token reduction can lower attention cost and KV-cache use, but rendering, visual encoding, and recognition errors remain part of the practical tradeoff.

- **Interaction history permits adaptive fidelity and reuse.** AgentOCR caches repeated rendered segments and learns per-step compression choices. Its dense compression-reward ablation shows that success-conditioned rewards alone do not prevent harmful overcompression.

## Important Papers

- [[papers/glyph-scaling-context-windows-via-visual-text-compression|Glyph: Scaling Context Windows via Visual-Text Compression]]: trains a VLM on rendered long text and searches for rendering settings that balance accuracy and compression.
- [[papers/imgcot-compressing-long-chain-of-thought-into-compact-visual-tokens-for-efficient-reasoning-of-large-language-model|ImgCoT: Compressing Long Chain of Thought into Compact Visual Tokens for Efficient Reasoning of Large Language Model]]: compresses spatially rendered reasoning traces into a short sequence of discrete visual tokens.

- [[papers/agentocr-reimagining-agent-history-via-optical-self-compression|AgentOCR]]: applies optical compression to evolving agent histories, combining segment caching with learned compression control.

## Related Concepts

- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]
- [[concepts/latent-reasoning|Latent Reasoning]]
