"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'

interface ModalContextType {
  openModal: (title: string, content: ReactNode, options?: ModalOptions) => void
  closeModal: () => void
  closeAllModals: () => void
  isModalOpen: boolean
}

interface ModalOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  contentClassName?: string 
}

interface ModalState {
  title: string
  content: ReactNode
  options: ModalOptions
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalState | null>(null)

  const openModal = useCallback((title: string, content: ReactNode, options: ModalOptions = {}) => {
    setModal({
      title,
      content,
      options: {
        size: 'md',
        closable: true,
        ...options
      }
    })
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

  const closeAllModals = useCallback(() => {
    setModal(null)
  }, [])

  const isModalOpen = Boolean(modal)

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm': return 'max-w-sm'
      case 'md': return 'max-w-md'
      case 'lg': return 'max-w-lg'
      case 'xl': return 'max-w-xl'
      default: return 'max-w-md'
    }
  }

  return (
    <ModalContext.Provider value={{ 
      openModal, 
      closeModal, 
      closeAllModals, 
      isModalOpen 
    }}>
      {children}
      
      {/* Universal Modal Renderer */}
      {modal && (
        <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
          <DialogContent className={`min-w-2xl ${modal.options.contentClassName}`}>
            {modal.options.closable !== false && (
              <DialogClose onClose={closeModal} />
            )}
            <DialogHeader>
              <DialogTitle>{modal.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {modal.content}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
} 