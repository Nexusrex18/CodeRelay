"use client"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on readability",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout ideal for corporate environments",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industries and startups",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design with plenty of white space",
    image: "/placeholder.svg?height=200&width=150",
  },
]

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Choose a Template</h3>
        <p className="text-sm text-muted-foreground">Select a design template for your resume and cover letter</p>
      </div>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
            <Label htmlFor={template.id} className="cursor-pointer">
              <Card
                className={`overflow-hidden transition-all ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                }`}
              >
                <div className="relative aspect-[3/4] w-full">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={`${template.name} template preview`}
                    className="object-cover w-full h-full"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="font-medium">{template.name}</div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

