import { Component } from 'vue';
export interface SourceModel {
    data: any;
    key: string;
    source: any;
}
export interface ComponentItem {
    name?: string;
    component: Component;
    description?: string;
}
