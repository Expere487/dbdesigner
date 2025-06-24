import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectOption } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { RiDatabase2Line, RiGitBranchLine, RiUploadLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { toast, Toaster } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { getUser } from '@/lib/supabase/auth/action'

export default function NewProject({ onClose }: { onClose: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null) 
    useEffect(() => {
        getUser().then(user => {
            setUser(user)
        })
    }, [])
    console.log(user)
    const [formData, setFormData] = useState({
        name: '',
        user_id: user?.id,
        description: '',
        type: 'blank' as 'blank' | 'template' | 'import',
        databaseType: 'mysql' as 'mysql' | 'postgresql' | 'sqlite',
        template: '',
        sqlFile: null
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch('/api/project/create', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        console.log(data)
        if (data.error) {
            toast(data.error)
        } else {
            toast('Project created successfully')
        }
        onClose()
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData(prev => ({ ...prev, sqlFile: file }))
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            description: '',
            type: 'blank',
            user_id: user?.id,
            databaseType: 'mysql',
            template: '',
            sqlFile: null
        })
        onClose()
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Project Name */}
            <p className='text-sm text-muted-foreground'>{user?.email}</p>
            <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                    id="project-name"
                    placeholder="Enter project name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
                <Label htmlFor="project-description">Description (Optional)</Label>
                <Input
                    id="project-description"
                    placeholder="Describe your project"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
            </div>
            <div className="space-y-2 w-full">
                <Label htmlFor="project-name">Database Type</Label>
                <ToggleGroup type="single" value={formData.databaseType} onValueChange={(value) => handleInputChange('databaseType', value)} className="w-full">
                    <ToggleGroupItem value="mysql">MySQL</ToggleGroupItem>
                    <ToggleGroupItem value="postgresql">PostgreSQL</ToggleGroupItem>
                    <ToggleGroupItem value="sqlite">SQLite</ToggleGroupItem>
                </ToggleGroup>
            </div>
            {/* Project Type */}
            <div className="space-y-3">
                <Label>Project Type</Label>
                <div className="grid grid-cols-3 gap-3">
                    {/* Blank Project */}
                    <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.type === 'blank'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                        onClick={() => handleInputChange('type', 'blank')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <RiDatabase2Line className="size-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Blank Project</h4>
                                <p className="text-xs text-muted-foreground">Start with an empty canvas</p>
                            </div>
                        </div>
                    </div>

                    {/* Template */}
                    <div
                        className={`border rounded-lg p-4 transition-all ${
                            formData.databaseType !== 'mysql' 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'cursor-pointer hover:border-primary/50'
                        } ${formData.type === 'template'
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                        onClick={() => formData.databaseType === 'mysql' && handleInputChange('type', 'template')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                                <RiGitBranchLine className="size-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Use Template</h4>
                                <p className="text-xs text-muted-foreground">Start with a predefined schema</p>
                            </div>
                        </div>
                    </div>

                    {/* Import SQL */}
                    <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.type === 'import'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                        onClick={() => handleInputChange('type', 'import')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                                <RiUploadLine className="size-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Import SQL</h4>
                                <p className="text-xs text-muted-foreground">Import from existing SQL file</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Selection */}
            {formData.type === 'template' && (
                <div className="space-y-2">
                    <Label htmlFor="template-select">Choose Template</Label>
                    <Select
                        id="template-select"
                        value={formData.template || ''}
                        onChange={(e) => handleInputChange('template', e.target.value)}
                    >
                        <SelectOption value="">Select a template</SelectOption>
                        <SelectOption value="ecommerce">E-Commerce Store</SelectOption>
                        <SelectOption value="blog">Blog/CMS</SelectOption>
                        <SelectOption value="crm">Customer Relationship Management</SelectOption>
                        <SelectOption value="inventory">Inventory Management</SelectOption>
                    </Select>
                </div>
            )}

            {/* File Upload */}
            {formData.type === 'import' && (
                <div className="space-y-2">
                    <Label htmlFor="sql-file">SQL File</Label>
                    <input
                        id="sql-file"
                        type="file"
                        accept=".sql,.txt"
                        onChange={handleFileChange}
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {formData.sqlFile && (
                        <p className="text-xs text-muted-foreground">
                            Selected: {formData.sqlFile.name}
                        </p>
                    )}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !formData.name.trim()}>
                    {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
            </div>
        </form>
    )
}
