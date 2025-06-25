"use client"
import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Plus, Trash2, Key, KeyRound } from 'lucide-react';
import { MySqlDataTypes, PostgreSqlDataTypes, Field } from '@/types/types';
import { useModal } from '@/hooks/use-modal';

interface FormField {
    name: string;
    type: keyof MySqlDataTypes | keyof PostgreSqlDataTypes;
    length?: number;
    isPrimary: boolean;
    isUnique: boolean;
    isForeign: boolean;
    isNullable: boolean;
    defaultValue?: string;
    comment?: string;
}
const SQL_TYPES: (keyof MySqlDataTypes | keyof PostgreSqlDataTypes)[] = [
    'VARCHAR', 'TEXT', 'CHAR',
    'INT', 'BIGINT', 'SMALLINT', 'TINYINT',
    'DECIMAL', 'FLOAT', 'DOUBLE',
    'DATE', 'DATETIME', 'TIMESTAMP', 'TIME',
    'BOOLEAN', 'ENUM', 'JSON'
];
export default function NewTable({ onSubmit, onClose }: { onSubmit: (tableName: string, fields: Field[]) => void, onClose: () => void }) {
    const [tableName, setTableName] = useState('');
    const [fields, setFields] = useState<FormField[]>([
        {
            name: 'id',
            type: 'INT',
            isPrimary: true,
            isUnique: false,
            isForeign: false,
            isNullable: false,
            comment: 'Primary key'
        }
    ]);

    const addField = useCallback(() => {
        setFields(prev => [...prev, {
            name: '',
            type: 'VARCHAR',
            length: 255,
            isPrimary: false,
            isUnique: false,
            isForeign: false,
            isNullable: true,
            defaultValue: '',
            comment: ''
        }]);
    }, []);

    const removeField = useCallback((index: number) => {
        setFields(prev => prev.filter((_, i) => i !== index));
    }, []);

    const updateField = useCallback((index: number, updates: Partial<FormField>) => {
        setFields(prev => prev.map((field, i) =>
            i === index ? { ...field, ...updates } : field
        ));
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (!tableName.trim()) {
            alert('Tablo adı gereklidir');
            return;
        }

        if (fields.length === 0) {
            alert('En az bir sütun eklenmelidir');
            return;
        }

        const hasEmptyFields = fields.some(field => !field.name.trim());
        if (hasEmptyFields) {
            alert('Tüm sütun adları doldurulmalıdır');
            return;
        }

        const convertedFields: Field[] = fields.map(field => ({
            name: field.name,
            type: field.type,
            length: field.length,
            isPrimary: field.isPrimary,
            isUnique: field.isUnique,
            isForeign: field.isForeign,
            isNullable: field.isNullable,
            defaultValue: field.defaultValue || undefined,
            comment: field.comment || undefined
        }));

        onSubmit(tableName, convertedFields);

        // Reset form
        setTableName('');
        setFields([{
            name: 'id',
            type: 'INT',
            isPrimary: true,
            isUnique: false,
            isForeign: false,
            isNullable: false,
            comment: 'Primary key'
        }]);

        onClose();
    }, [tableName, fields, onSubmit, onClose])
    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* Tablo Adı */}
            <div className="space-y-2">
                <Label htmlFor="tableName">Tablo Adı</Label>
                <Input
                    id="tableName"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="Tablo adını girin..."
                    className="font-mono"
                />
            </div>

            {/* Sütunlar */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Sütunlar</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addField}
                        className="flex items-center gap-2"
                    >
                        <Plus className="size-4" />
                        Sütun Ekle
                    </Button>
                </div>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={index} className="grid grid-cols-12 gap-3 p-4 border rounded-lg bg-muted/20">
                            {/* Sütun Adı */}
                            <div className="col-span-3">
                                <Label className="text-xs">Sütun Adı</Label>
                                <Input
                                    value={field.name}
                                    onChange={(e) => updateField(index, { name: e.target.value })}
                                    placeholder="Sütun adı"
                                    className="font-mono text-sm"
                                />
                            </div>

                            {/* Veri Tipi */}
                            <div className="col-span-2">
                                <Label className="text-xs">Veri Tipi</Label>
                                <Select
                                    value={field.type}
                                    onChange={(e) => updateField(index, { type: e.target.value as keyof MySqlDataTypes | keyof PostgreSqlDataTypes })}
                                    className="text-sm"
                                >
                                    {SQL_TYPES.map(type => (
                                        <SelectOption key={type} value={type}>{type}</SelectOption>
                                    ))}
                                </Select>
                            </div>

                            {/* Uzunluk */}
                            <div className="col-span-1">
                                <Label className="text-xs">Uzunluk</Label>
                                <Input
                                    type="number"
                                    value={field.length || ''}
                                    onChange={(e) => updateField(index, { length: e.target.value ? parseInt(e.target.value) : undefined })}
                                    placeholder="255"
                                    className="text-sm"
                                />
                            </div>

                            {/* Özellikler */}
                            <div className="col-span-3 space-y-2">
                                <Label className="text-xs">Özellikler</Label>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        type="button"
                                        variant={field.isPrimary ? "default" : "outline"}
                                        size="sm"
                                        className="text-xs h-7"
                                        onClick={() => updateField(index, { isPrimary: !field.isPrimary })}
                                    >
                                        PK
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={field.isUnique ? "default" : "outline"}
                                        size="sm"
                                        className="text-xs h-7"
                                        onClick={() => updateField(index, { isUnique: !field.isUnique })}
                                    >
                                        UQ
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={field.isForeign ? "default" : "outline"}
                                        size="sm"
                                        className="text-xs h-7"
                                        onClick={() => updateField(index, { isForeign: !field.isForeign })}
                                    >
                                        FK
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={field.isNullable ? "outline" : "default"}
                                        size="sm"
                                        className="text-xs h-7"
                                        onClick={() => updateField(index, { isNullable: !field.isNullable })}
                                    >
                                        NN
                                    </Button>
                                </div>
                            </div>

                            {/* Default Değer */}
                            <div className="col-span-2">
                                <Label className="text-xs">Varsayılan</Label>
                                <Input
                                    value={field.defaultValue || ''}
                                    onChange={(e) => updateField(index, { defaultValue: e.target.value })}
                                    placeholder="Varsayılan değer"
                                    className="text-sm"
                                />
                            </div>

                            {/* Sil Butonu */}
                            <div className="col-span-1 flex items-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeField(index)}
                                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                                    disabled={fields.length === 1}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>

                            {/* Yorum */}
                            <div className="col-span-12 mt-2">
                                <Label className="text-xs">Yorum</Label>
                                <Input
                                    value={field.comment || ''}
                                    onChange={(e) => updateField(index, { comment: e.target.value })}
                                    placeholder="Sütun açıklaması..."
                                    className="text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                >
                    İptal
                </Button>
                <Button type="submit">
                    Tablo Oluştur
                </Button>
            </div>
        </form>
    )
}
