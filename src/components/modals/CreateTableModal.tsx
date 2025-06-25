import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Field, MySqlDataTypes, PostgreSqlDataTypes } from '@/types/types';

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tableName: string, fields: Field[]) => void;
}

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

export default function CreateTableModal({ isOpen, onClose, onSubmit }: CreateTableModalProps) {
;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="size-5" />
            Yeni Tablo Oluştur
          </DialogTitle>
        </DialogHeader>

    
      </DialogContent>
    </Dialog>
  );
} 