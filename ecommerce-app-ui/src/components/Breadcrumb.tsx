import { Link } from 'react-router-dom'

type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  title?: string
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ title, items }: BreadcrumbProps) => {
  const hasTitle = Boolean(title?.trim())

  return (
    <section className="bg-text-gray">
      <div
        className={`mx-auto flex max-w-[1040px] items-center px-9 py-9 ${
          hasTitle ? 'justify-between' : 'justify-start'
        }`}
      >
        {hasTitle && (
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
        )}
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-1">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-1">
                {index > 0 && <span className="px-1 text-light">&gt;</span>}
                {item.to ? (
                  <Link to={item.to} className="font-bold text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-normal text-light">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}

export default Breadcrumb
