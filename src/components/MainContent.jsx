import { Link } from "react-router-dom";
import  {useProductContext} from "../context/Products.context"

export default function MainContent() {
  const { categories, categoriesLoading, categoriesError } = useProductContext();
 
  return (
    <main className="container py-5">
      <section>
        <h2 className="text-center mb-5">Featured Categories</h2>

        {categoriesError ? (
          <div className="alert alert-danger text-center">
            An error occurred while loading categories: {categoriesError.message}
          </div>
        ) :
         categoriesLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading categories...</p>
          </div>
        ) : (
          <div className="row g-4 mt-1">
            {categories?.data?.categories?.map((category) => (
              <div key={category._id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <Link 
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="ratio ratio-1x1">
                      <img 
                        src={category.image} 
                        className="card-img-top object-fit-cover" 
                        alt={category.name}
                      />
                    </div>
                    <div className="card-body text-center p-2">
                      <h6 className="card-title mb-0 fw-semibold py-2">{category.name}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
