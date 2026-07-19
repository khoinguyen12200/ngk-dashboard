import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Progress,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Textarea,
  Toggle,
  Page,
  Layout,
  PageActions,
} from '@/index'

// Render smoke tests: every one of these must mount without throwing. Cheap,
// but they catch the kind of regression that shipped silently before (a broken
// prop type, a bad import, a missing export).
describe('components render without crashing', () => {
  it('renders standalone primitives', () => {
    const { container } = render(
      <div>
        <Button variant='secondary'>Click</Button>
        <Badge variant='outline'>New</Badge>
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Body</AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
        <Input placeholder='name' />
        <Textarea placeholder='bio' />
        <Label>Label</Label>
        <Checkbox />
        <Switch />
        <Progress value={40} />
        <Slider defaultValue={[50]} />
        <Toggle>B</Toggle>
        <Separator />
        <Skeleton className='h-4 w-10' />
        <Avatar />
      </div>
    )
    expect(container).toBeTruthy()
  })

  it('renders composite primitives', () => {
    const { getByText } = render(
      <div>
        <Accordion type='single' collapsible>
          <AccordionItem value='a'>
            <AccordionTrigger>Section</AccordionTrigger>
            <AccordionContent>Panel</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    )
    expect(getByText('Section')).toBeInTheDocument()
    expect(getByText('Home')).toBeInTheDocument()
  })

  it('renders a Polaris-style Page with actions + Layout', () => {
    const { getByText, getByRole } = render(
      <Page
        title='Orders'
        subtitle='All orders'
        primaryAction={{ content: 'Save', onClick: () => {} }}
        secondaryActions={[{ content: 'Export' }]}
      >
        <Layout>
          <Layout.Section>Main</Layout.Section>
          <Layout.Section variant='oneThird'>Aside</Layout.Section>
        </Layout>
        <PageActions primaryAction={{ content: 'Done' }} />
      </Page>
    )
    expect(getByRole('heading', { name: 'Orders' })).toBeInTheDocument()
    expect(getByText('Save')).toBeInTheDocument()
    expect(getByText('Export')).toBeInTheDocument()
    expect(getByText('Main')).toBeInTheDocument()
    expect(getByText('Aside')).toBeInTheDocument()
  })
})
