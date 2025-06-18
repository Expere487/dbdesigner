import { TableNode } from "@/types/types";
import type { Node, Edge } from "@xyflow/react";

// Define the initial nodes (tables)
export const initialNodes: TableNode[] = [
  {
    id: "users",
    type: "tableNode",
    position: { x: 800, y: 150 },
    data: {
      label: "users",
      fields: [
        { name: "id", type: "integer", isPrimary: true, length: 11, comment: "User ID", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "full_name", type: "varchar", length: 255, comment: "User Full Name", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "email", type: "varchar", length: 255, comment: "User Email", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "gender", type: "varchar", length: 10, comment: "User Gender", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "date_of_birth", type: "date", comment: "User Date of Birth", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "country_code", type: "varchar", length: 2, comment: "User Country Code", isForeign: true, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "created_at", type: "timestamp", comment: "User Created At", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
      ],
    },
  },
  {
    id: "orders",
    type: "tableNode",
    position: { x: 450, y: 183 },
    data: {
      label: "orders",
      fields: [
        { name: "id", type: "integer", isPrimary: true, length: 11, comment: "Order ID", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "user_id", type: "integer", isForeign: true, length: 11, comment: "User ID", isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "status", type: "varchar", length: 255, comment: "Order Status", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "total_amount", type: "decimal", length: 10, comment: "Order Total Amount", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "created_at", type: "timestamp", comment: "Order Created At", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
      ],
    },
  },
  {
    id: "order_items",
    type: "tableNode",
    position: { x: 100, y: 150 },
    data: {
      label: "order_items",
      fields: [
        { name: "id", type: "integer", isPrimary: true, length: 11, comment: "Order Item ID", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "order_id", type: "integer", isForeign: true, length: 11, comment: "Order ID", isUnique: true, isNullable: false, defaultValue: "0" },
        { name: "product_id", type: "integer", isForeign: true, length: 11, comment: "Product ID", isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "quantity", type: "integer", length: 11, comment: "Order Item Quantity", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "unit_price", type: "decimal", length: 10, comment: "Order Item Unit Price", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
      ],
    },
  },
  {
    id: "products",
    type: "tableNode",
    position: { x: 100, y: 460 },
    data: {
      label: "products",
      fields: [
        { name: "id", type: "integer", isPrimary: true, length: 11, comment: "Product ID", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "merchant_id", type: "integer", isForeign: true, length: 11, comment: "Merchant ID", isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "name", type: "varchar", length: 255, comment: "Product Name", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "description", type: "text", comment: "Product Description", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "price", type: "decimal", length: 10, comment: "Product Price", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "status", type: "varchar", length: 255, comment: "Product Status", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "created_at", type: "timestamp", comment: "Product Created At", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
      ],
    },
  },
  {
    id: "merchants",
    type: "tableNode",
    position: { x: 450, y: 493 },
    data: {
      label: "merchants",
      fields: [
        { name: "id", type: "integer", isPrimary: true, length: 11, comment: "Merchant ID", isForeign: false, isUnique: false, isNullable: false, defaultValue: "0" },
        { name: "name", type: "varchar", length: 255, comment: "Merchant Name", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "email", type: "varchar", length: 255, comment: "Merchant Email", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "country_code", type: "varchar", length: 2, comment: "Merchant Country Code", isForeign: true, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "created_at", type: "timestamp", comment: "Merchant Created At", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
      ],
    },
  },
  {
    id: "countries",
    type: "tableNode",
    position: { x: 800, y: 570 },
    data: {
      label: "countries",
      fields: [
        { name: "code", type: "varchar", isPrimary: true, length: 2, comment: "Country Code", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "name", type: "varchar", length: 255, comment: "Country Name", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "continent_name", type: "varchar", length: 255, comment: "Continent Name", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
        { name: "currency", type: "varchar", length: 3, comment: "Currency", isForeign: false, isUnique: false, isNullable: false, defaultValue: "" },
      ],
    },
  },
];

// Define the edges (relationships) between tables with specific column connections
export const initialEdges: Edge[] = [
  // User to Orders (one-to-many): users.id -> orders.user_id
  {
    id: "users-orders",
    source: "users",
    target: "orders",
    sourceHandle: "id",
    targetHandle: "user_id",
  },
  // Orders to Order Items (one-to-many): orders.id -> order_items.order_id
  {
    id: "orders-order_items",
    source: "orders",
    target: "order_items",
    sourceHandle: "id",
    targetHandle: "order_id",
  },
  // Products to Order Items (one-to-many): products.id -> order_items.product_id
  {
    id: "products-order_items",
    source: "products",
    target: "order_items",
    sourceHandle: "id",
    targetHandle: "product_id",
  },
  // Merchants to Products (one-to-many): merchants.id -> products.merchant_id
  {
    id: "merchants-products",
    source: "merchants",
    target: "products",
    sourceHandle: "id",
    targetHandle: "merchant_id",
  },
  // Countries to Users (one-to-many): countries.code -> users.country_code
  {
    id: "countries-users",
    source: "countries",
    target: "users",
    sourceHandle: "code",
    targetHandle: "country_code",
  },
  // Countries to Merchants (one-to-many): countries.code -> merchants.country_code
  {
    id: "countries-merchants",
    source: "countries",
    target: "merchants",
    sourceHandle: "code",
    targetHandle: "country_code",
  },
];
