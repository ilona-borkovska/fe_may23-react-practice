import cn from 'classnames';
import { useState } from 'react';

const SORT_DEFAULT = 'fa-sort';
const SORT_ASC = 'fa-sort-up';
const SORT_DESC = 'fa-sort-down';
const SORT_BY_ID = 'id';
const SORT_BY_CATEGORY = 'category';
const SORT_BY_PRODUCT = 'product';
const SORT_BY_USER = 'user';

const sortProducts = (products, col, direction) => {
  const copyProducts = [...products];

  switch (col) {
    case SORT_BY_ID:
      copyProducts.sort((product1, product2) => (
        product1.id - product2.id));
      break;

    case SORT_BY_PRODUCT:
      copyProducts.sort((product1, product2) => (
        product1.name.localeCompare(product2.name)));
      break;

    case SORT_BY_CATEGORY:
      copyProducts.sort((product1, product2) => (
        product1.category.title.localeCompare(product2.category.title)));
      break;

    case SORT_BY_USER:
      copyProducts.sort((product1, product2) => (
        product1.user.name.localeCompare(product2.user.name)));
      break;

    default:
      return copyProducts;
  }

  if (direction === SORT_DESC) {
    return copyProducts.reverse();
  }

  if (direction === SORT_DEFAULT) {
    return products;
  }

  return copyProducts;
};

export const ProductTable = ({ products }) => {
  const [sortedColName, setSortedColName] = useState('');
  const [sortDirection, setSortDirection] = useState(SORT_DEFAULT);
  const sortedProducts = sortProducts(products, sortedColName, sortDirection);

  const handleSortClick = (sortType) => {
    setSortedColName(sortType);

    if (sortType !== sortedColName && sortType !== '') {
      setSortDirection(SORT_ASC);

      return 0;
    }

    switch (sortDirection) {
      case SORT_DEFAULT:
        return setSortDirection(SORT_ASC);

      case SORT_ASC:
        return setSortDirection(SORT_DESC);

      default:
        return setSortDirection(SORT_DEFAULT);
    }
  };

  const setClassNamesForIcon = (type, colName) => (
    sortDirection === type && sortedColName === colName);

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID

              <a
                href="#/"
                onClick={() => handleSortClick(SORT_BY_ID)}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon(SORT_DEFAULT, SORT_BY_ID)
                        || sortedColName !== SORT_BY_ID,
                      'fa-sort-up': setClassNamesForIcon(SORT_ASC, SORT_BY_ID),
                      'fa-sort-down': setClassNamesForIcon(
                        SORT_DESC,
                        SORT_BY_ID,
                      ),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product

              <a
                href="#/"
                onClick={() => handleSortClick(SORT_BY_PRODUCT)}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon(
                        SORT_DEFAULT,
                        SORT_BY_PRODUCT,
                      )
                        || sortedColName !== SORT_BY_PRODUCT,
                      'fa-sort-up': setClassNamesForIcon(
                        SORT_ASC,
                        SORT_BY_PRODUCT,
                      ),
                      'fa-sort-down': setClassNamesForIcon(
                        SORT_DESC,
                        SORT_BY_PRODUCT,
                      ),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category

              <a
                href="#/"
                onClick={() => handleSortClick(SORT_BY_CATEGORY)}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon(
                        SORT_DEFAULT,
                        SORT_BY_CATEGORY,
                      )
                        || sortedColName !== SORT_BY_CATEGORY,
                      'fa-sort-up': setClassNamesForIcon(
                        SORT_ASC,
                        SORT_BY_CATEGORY,
                      ),
                      'fa-sort-down': setClassNamesForIcon(
                        SORT_DESC,
                        SORT_BY_CATEGORY,
                      ),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User

              <a
                href="#/"
                onClick={() => handleSortClick(SORT_BY_USER)}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon(
                        SORT_DEFAULT,
                        SORT_BY_USER,
                      )
                        || sortedColName !== SORT_BY_USER,
                      'fa-sort-up': setClassNamesForIcon(
                        SORT_ASC,
                        SORT_BY_USER,
                      ),
                      'fa-sort-down': setClassNamesForIcon(
                        SORT_DESC,
                        SORT_BY_USER,
                      ),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedProducts.map(product => (
          <tr
            key={product.id}
            data-cy="Product"
          >
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">
              {product.name}
            </td>
            <td data-cy="ProductCategory">
              {`${product.category.icon} - ${product.category.title}`}
            </td>

            <td
              data-cy="ProductUser"
              className={cn({
                'has-text-danger': product.user.sex === 'f',
                'has-text-link': product.user.sex === 'm',
              })}
            >
              {product.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
