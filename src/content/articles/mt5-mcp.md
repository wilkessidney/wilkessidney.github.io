---
title: 把 MetaTrader 5 接入 MCP 生态
date: 2026-08-10
summary: 用 MCP（模型上下文协议）把 MT5 的行情、账户与下单能力暴露给 AI Agent，让「对话即交易」从演示变成可复用的工程模块。
category: 技术
tags: [MCP, MetaTrader, AI Agent]
readingTime: 6
featured: false
draft: false
---

最近把 MetaTrader 5 接进了 MCP（Model Context Protocol）生态。目标很直接：让一个 AI Agent 能读取行情、查询持仓、按计划执行订单，而不用每次都重写一遍胶水代码。

## MCP 解决了什么

过去要让 LLM 操作交易终端，要么是一次性脚本，要么是各家自己造的私有协议。MCP 把「能力」标准化成一套工具接口：Agent 只要会说 MCP，就能即插即用地使用任意服务。

对交易来说，这意味着行情源、券商、风控可以拆成独立 server，Agent 组合调用。

## 我暴露了哪些工具

```text
get_quote(symbol)        # 实时报价
get_positions()          # 当前持仓
get_account_info()       # 余额 / 权益 / 杠杆
place_order(symbol, vol, side, sl, tp)  # 下单
close_position(ticket)   # 平仓
```

每个工具都带结构化入参与明确返回，Agent 不需要理解 MT5 内部细节。

## 安全是底线

接上交易能力后，第一件事不是「能下单」，而是「**不能乱下单**」：

- 所有写操作默认走模拟账户；
- 单笔仓位、日内总敞口有硬上限；
- 任何下单动作都要可回放、可审计。

> 让 AI 控制资金，优先级从来不是「多聪明」，而是「多可控」。

下一步打算把风控逻辑本身也做成一层 MCP server，让 Agent 在调用 `place_order` 前先过一遍 `risk_check`。
