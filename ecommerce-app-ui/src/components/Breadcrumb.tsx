import { Link } from 'react-router-dom'

type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <section className="bg-text-gray">
      <div className="mx-auto flex max-w-[1040px] justify-center px-6 py-9 md:justify-end">
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
