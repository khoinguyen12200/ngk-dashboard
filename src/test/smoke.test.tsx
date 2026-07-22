import { describe, it, expect, vi } from 'vitest'
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
  CardSkeleton,
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
  SaveBar,
  DashboardLayout,
  ThemeProvider,
  BlockStack,
  InlineStack,
  Text,
  Banner,
  EmptyState,
  ErrorState,
  SkeletonPage,
  StatCard,
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

  it('projects Page title + actions into the DashboardLayout header', () => {
    const onSave = vi.fn()
    const { getByRole, getByText, getAllByRole } = render(
      <DashboardLayout nav={[{ items: [{ title: 'Home', href: '/' }] }]} fixed>
        <Page
          title='Orders'
          breadcrumbs={[{ label: 'Shop', href: '/shop' }]}
          primaryAction={{ content: 'Publish', onClick: () => {} }}
          secondaryActions={[{ content: 'Export' }]}
        >
          Body content
        </Page>
        <SaveBar open message='Unsaved changes' onSave={onSave} />
      </DashboardLayout>
    )
    // Title renders once (in the top header); body still renders below.
    expect(getByRole('heading', { name: 'Orders' })).toBeInTheDocument()
    expect(getByText('Body content')).toBeInTheDocument()
    // Actions project into the header (rendered for both desktop + mobile,
    // one visible via CSS) — at least one is present.
    expect(getAllByRole('button', { name: 'Publish' }).length).toBeGreaterThan(
      0
    )
    // SaveBar takes over the header when open.
    expect(getByText('Unsaved changes')).toBeInTheDocument()
    expect(getAllByRole('button', { name: 'Save' }).length).toBeGreaterThan(0)
  })

  it('renders an indeterminate Checkbox without crashing', () => {
    const { container } = render(<Checkbox checked='indeterminate' />)
    expect(container.querySelector('[data-slot="checkbox"]')).toHaveAttribute(
      'data-state',
      'indeterminate'
    )
  })

  it('ThemeProvider sets brand CSS variables on its subtree', () => {
    const { getByTestId } = render(
      <ThemeProvider
        primary='#5b5bd6'
        radius='0.5rem'
        font='Inter, sans-serif'
        data-testid='theme'
      >
        <Button>Branded</Button>
      </ThemeProvider>
    )
    const root = getByTestId('theme')
    expect(root.style.getPropertyValue('--primary')).toBe('#5b5bd6')
    expect(root.style.getPropertyValue('--radius')).toBe('0.5rem')
    expect(root.style.fontFamily).toBe('Inter, sans-serif')
  })

  it('renders content primitives (stacks, text, banner, empty state)', () => {
    const { getByText, getByRole } = render(
      <BlockStack gap={4}>
        <Text variant='headingLg'>Dashboard</Text>
        <InlineStack gap={2} justify='between'>
          <Text tone='subdued'>Subtitle</Text>
          <Text>Right</Text>
        </InlineStack>
        <Banner tone='success' title='Saved'>
          Your changes are live.
        </Banner>
        <EmptyState heading='No data'>Nothing here yet.</EmptyState>
      </BlockStack>
    )
    expect(getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(getByText('Saved')).toBeInTheDocument()
    expect(getByText('No data')).toBeInTheDocument()
  })

  it('renders a SkeletonPage', () => {
    const { container } = render(<SkeletonPage primaryAction sections={2} />)
    expect(container.querySelector('[data-slot="skeleton-page"]')).toBeTruthy()
  })

  it('renders a StatCard with a trend delta', () => {
    const { getByText } = render(
      <StatCard label='Revenue' value='$12,480' delta='+12.5%' trend='up' />
    )
    expect(getByText('Revenue')).toBeInTheDocument()
    expect(getByText('$12,480')).toBeInTheDocument()
    expect(getByText('+12.5%')).toBeInTheDocument()
  })

  it('Card supports loading, disabled, selected, interactive, and tone', () => {
    const onClick = vi.fn()
    const { container, getByRole } = render(
      <div>
        <Card loading data-testid='c1'>
          <CardContent>Refreshing</CardContent>
        </Card>
        <Card disabled data-testid='c2'>
          <CardContent>Locked</CardContent>
        </Card>
        <Card selected tone='success'>
          <CardContent>Chosen</CardContent>
        </Card>
        <Card interactive onClick={onClick}>
          <CardContent>Clickable</CardContent>
        </Card>
      </div>
    )
    expect(
      container.querySelector('[data-slot="card-loading"]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-testid="c2"]')).toHaveAttribute(
      'data-disabled'
    )
    const clickable = getByRole('button')
    clickable.click()
    expect(onClick).toHaveBeenCalled()
  })

  it('renders an ErrorState with a working retry', () => {
    const onRetry = vi.fn()
    const { getByText, getByRole } = render(
      <ErrorState onRetry={onRetry}>Could not load orders.</ErrorState>
    )
    expect(getByText('Something went wrong')).toBeInTheDocument()
    getByRole('button', { name: 'Try again' }).click()
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('renders a CardSkeleton', () => {
    const { container } = render(<CardSkeleton lines={4} />)
    expect(container.querySelectorAll('[data-slot="skeleton"]').length).toBe(6)
  })

  it('Input supports icon/clearable/loading/error addons', () => {
    const onClear = vi.fn()
    const { getByRole, getByPlaceholderText } = render(
      <Input
        placeholder='Search'
        error
        clearable
        onClear={onClear}
        value='abc'
        onChange={() => {}}
      />
    )
    expect(getByPlaceholderText('Search')).toHaveAttribute(
      'aria-invalid',
      'true'
    )
    getByRole('button', { name: 'Clear' }).click()
    expect(onClear).toHaveBeenCalledOnce()
  })

  it('Textarea shows a character count', () => {
    const { getByText } = render(
      <Textarea showCount maxLength={100} defaultValue='hello' />
    )
    expect(getByText('5 / 100')).toBeInTheDocument()
  })

  it('Badge supports semantic tone + dot', () => {
    const { getByText } = render(
      <Badge variant='success' dot>
        Active
      </Badge>
    )
    expect(getByText('Active')).toBeInTheDocument()
  })

  it('SaveBar shows Save/Discard when open and nothing when closed', () => {
    const { queryByText, rerender } = render(<SaveBar open={false} />)
    expect(queryByText('Save')).toBeNull()
    rerender(<SaveBar open message='Unsaved changes' />)
    expect(queryByText('Unsaved changes')).toBeInTheDocument()
    expect(queryByText('Save')).toBeInTheDocument()
    expect(queryByText('Discard')).toBeInTheDocument()
  })
})
