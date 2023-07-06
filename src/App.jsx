import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './components/Table';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(currentCategory => (
    product.categoryId === currentCategory.id));
  const user = usersFromServer.find(currentUser => (
    category.ownerId === currentUser.id));

  return {
    ...product,
    user,
    category,
  };
});

const filterProducts = (query, selectedUserId, selectedCategoriesId) => {
  let copyProducts = [...products];

  if (query) {
    copyProducts = copyProducts.filter((product) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedProductName = product.name.toLowerCase().trim();

      return normalizedProductName.includes(normalizedQuery);
    });
  }

  if (selectedUserId) {
    copyProducts = copyProducts.filter(product => (
      product.user.id === selectedUserId));
  }

  if (selectedCategoriesId.length > 0) {
    copyProducts = copyProducts.filter(product => (
      selectedCategoriesId.includes(product.categoryId)));
  }

  return copyProducts;
};

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [query, setQuery] = useState('');

  const handleCategoryClick = (categoryId) => {
    const isCategorySelected = selectedCategoriesId
      .find(id => categoryId === id);

    if (isCategorySelected) {
      const filteredCategories = selectedCategoriesId
        .filter(id => id !== categoryId);

      setSelectedCategoriesId(filteredCategories);
    } else {
      setSelectedCategoriesId([...selectedCategoriesId, categoryId]);
    }
  };

  const preparedProducts = filterProducts(
    query,
    selectedUserId,
    selectedCategoriesId,
  );

  const resetAllFilters = () => {
    setSelectedUserId(0);
    setSelectedCategoriesId([]);
    setQuery('');
  };

  const isNotFound = (query
    || selectedUserId
    || selectedCategoriesId.length > 0
  ) && preparedProducts.length === 0;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#All"
                className={cn({
                  'is-active': selectedUserId === 0,
                })}
                onClick={() => setSelectedUserId(0)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  className={cn({
                    'is-active': selectedUserId === user.id,
                  })}
                  key={user.id}
                  data-cy="FilterUser"
                  href={`#${user.name}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#All"
                data-cy="AllCategories"
                className={cn('button', 'is-success', 'mr-6', {
                  'is-outlined': selectedCategoriesId.length > 0,
                })}
                onClick={() => setSelectedCategoriesId([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={cn('button', 'mr-2', 'my-1', {
                    'is-info': selectedCategoriesId.includes(category.id),
                  })}
                  href={`#${category.title}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => resetAllFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {isNotFound
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            ) : (
              <ProductTable products={preparedProducts} />
            )}
        </div>
      </div>
    </div>
  );
};
