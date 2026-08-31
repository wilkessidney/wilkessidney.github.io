---
title: AGE ERP 系统
year: 2024
summary: 集成 Amazon SP-API、Shopify 与多数据源的跨境电商 ERP，含 AI 订单分析助手，帮助中小卖家做进销存与财务对账。
type: 项目案例
tags: [ERP, 跨境电商, AI]
role: 技术负责人 / 全栈
tools: [FastAPI, Vue 3, SQLAlchemy, PostgreSQL]
links:
  - { label: "GitHub", url: "https://github.com/wilkessidney" }
featured: false
order: 3
---

## 背景

跨境电商卖家普遍被「多平台数据对不齐、订单靠表格管、财务月底才发现问题」困扰。现成 ERP 要么太贵，要么不贴合小团队节奏。

## 目标

做一个轻量但能打的 ERP：把订单、库存、财务拧成一条线，并用 AI 辅助分析异常订单。

## 过程

- 对接 Amazon SP-API 与 Shopify，做数据清洗与对齐；
- 用 SQLAlchemy 2.0 + Pydantic V2 规范数据层；
- 加了一个订单分析助手，能就「为什么这批货利润异常」给出结构化解读。

## 成果

- 把月底对账从「几天」压到「几小时」；
- 异常订单识别前置，减少了漏发与错发；
- 验证了「AI 嵌入业务流程」比「AI 单独做个聊天框」更有用。

## 个人职责

主导架构设计、核心模块开发与 AI 助手集成。

## 使用工具

FastAPI、Vue 3、SQLAlchemy 2.0、Pydantic V2、PostgreSQL、Redis。

## 复盘

最深的体会是**高内聚低耦合不是口号**。早期把订单和财务揉在一起，改一处崩一片；拆清楚边界后，迭代速度立刻上来了。
