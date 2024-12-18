import { createLazyFileRoute, Link } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { RecipeRecord } from '@cookware/lexicons'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sortable, SortableDragHandle, SortableItem } from '@/components/ui/sortable'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { Label } from '@/components/ui/label'
import { TrashIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/_/(app)/recipes/new')({
  component: RouteComponent,
})

const schema = RecipeRecord;

function RouteComponent() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: [
        { name: '' },
      ],
      steps: [
        { text: '' },
      ],
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  const ingredients = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const steps = useFieldArray({
    control: form.control,
    name: "steps",
  });

  return (
    <>
      <Breadcrumbs />
      <div className="flex-1 grid p-4 pt-0 max-w-xl w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New recipe</CardTitle>
            <CardDescription>Share your recipe with the world!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My awesome recipe!" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your recipe's name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-2">
                  <Label>Ingredients</Label>
                  <Sortable
                    value={ingredients.fields}
                    onMove={({ activeIndex, overIndex }) => ingredients.move(activeIndex, overIndex)}
                  >
                    <div className="flex w-full flex-col gap-2">
                      {ingredients.fields.map((field, index) => (
                        <SortableItem
                          key={field.id}
                          value={field.id}
                          asChild
                        >
                          <div className="grid grid-cols-[2rem_1fr_0.2fr_0.2fr_2rem] items-center gap-2">
                            <SortableDragHandle
                              type="button"
                              variant="outline"
                              size="icon"
                              className="size-8 shrink-0"
                            >
                              <DragHandleDots2Icon
                                className="size-4"
                                aria-hidden="true"
                              />
                            </SortableDragHandle>

                            <FormField
                              control={form.control}
                              name={`ingredients.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Ingredient"
                                      className="h-8"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`ingredients.${index}.amount`}
                              render={({ field: { value, ...field } }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="#"
                                      value={value || 0}
                                      className="h-8"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`ingredients.${index}.unit`}
                              render={({ field: { value, ...field } }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Unit"
                                      className="h-8"
                                      value={value || ''}
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <Button
                              type="button"
                              variant="destructive"
                              className="size-8"
                              onClick={(e) => {
                                e.preventDefault();
                                ingredients.remove(index);
                              }}
                            >
                              <TrashIcon />
                            </Button>
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </Sortable>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      ingredients.append({ name: '', amount: null, unit: null });
                    }}
                  >Add</Button>
                </div>

                <div className="grid gap-2">
                  <Label>Steps</Label>
                  <Sortable
                    value={steps.fields}
                    onMove={({ activeIndex, overIndex }) => steps.move(activeIndex, overIndex)}
                  >
                    <div className="flex w-full flex-col gap-2">
                      {steps.fields.map((field, index) => (
                        <SortableItem
                          key={field.id}
                          value={field.id}
                          asChild
                        >
                          <div className="grid grid-cols-[2rem_auto] items-center gap-2">
                            <SortableDragHandle
                              type="button"
                              variant="outline"
                              size="icon"
                              className="size-8 shrink-0"
                            >
                              <DragHandleDots2Icon
                                className="size-4"
                                aria-hidden="true"
                              />
                            </SortableDragHandle>
                            <FormField
                              control={form.control}
                              name={`steps.${index}.text`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input className="h-8" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </Sortable>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      steps.append({ text: '' })
                    }}
                  >Add</Button>
                </div>

                <Button
                  type="button"
                >
                  Submit
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

const Breadcrumbs = () => (
  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href="/recipes">Recipes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
);