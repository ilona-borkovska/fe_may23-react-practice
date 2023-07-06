import cn from 'classnames';
import { useState } from 'react';

const sortProducts = (products, col, direction) => {
  const copyProducts = [...products];

  switch (col) {
    case 'id':
      copyProducts.sort((product1, product2) => (
        product1.id - product2.id));
      break;

    case 'product':
      copyProducts.sort((product1, product2) => (
        product1.name.localeCompare(product2.name)));
      break;

    case 'category':
      copyProducts.sort((product1, product2) => (
        product1.category.title.localeCompare(product2.category.title)));
      break;

    case 'user':
      copyProducts.sort((product1, product2) => (
        product1.user.name.localeCompare(product2.user.name)));
      break;

    default:
      return copyProducts;
  }

  if (direction === 'fa-sort-up') {
    return copyProducts.reverse();
  }

  return copyProducts;
};

export const ProductTable = ({ products }) => {
  const [sortedColName, setSortedColName] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const sortedProducts = sortProducts(products, sortedColName, sortDirection);

  const handleSortClick = (currentSortType) => {
    if (currentSortType === 'fa-sort') {
      setSortDirection('fa-sort-up');

      return 0;
    }

    if (currentSortType === 'fa-sort-up') {
      setSortDirection('fa-sort-up');

      return 0;
    }

    setSortDirection('fa-sort');

    return 0;
  };

  const setClassNamesForIcon = (type, colName) => {
    if (sortDirection === type && sortedColName === colName) {
      return true;
    }

    return false;
  };

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
                onClick={() => {
                  setSortedColName('id');
                  handleSortClick('fa-sort');
                }}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon('fa-sort', 'id')
                        || sortedColName !== 'id',
                      'fa-sort-up': setClassNamesForIcon('fa-sort-up', 'id'),
                      'fa-sort-down': setClassNamesForIcon(
                        'fa-sort-down',
                        'id',
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
                onClick={() => {
                  setSortedColName('product');
                  handleSortClick('fa-sort');
                }}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon('fa-sort', 'product')
                        || sortedColName !== 'product',
                      'fa-sort-up': setClassNamesForIcon(
                        'fa-sort-up',
                        'product',
                      ),
                      'fa-sort-down': setClassNamesForIcon(
                        'fa-sort-down',
                        'product',
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
                onClick={() => {
                  setSortedColName('category');
                  handleSortClick('fa-sort');
                }}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon('fa-sort', 'category')
                        || sortedColName !== 'category',
                      'fa-sort-up': setClassNamesForIcon(
                        'fa-sort-up',
                        'category',
                      ),
                      'fa-sort-down': setClassNamesForIcon(
                        'fa-sort-down',
                        'category',
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
                onClick={() => {
                  setSortedColName('user');
                  handleSortClick('fa-sort');
                }}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn('fas', {
                      'fa-sort': setClassNamesForIcon('fa-sort', 'user')
                        || sortedColName !== 'user',
                      'fa-sort-up': setClassNamesForIcon(
                        'fa-sort-up',
                        'user',
                      ),
                      'fa-sort-down': setClassNamesForIcon(
                        'fa-sort-down',
                        'user',
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
