import React from 'react';
import Header from '../components/Header';

function RecipeDetails() {
  const { params } = useRouteMatch();
  const [,, fullUrl] = useCreateUrl(`lookup.php?i=${params.id}`);
  const { data, loading, fetchData } = useFetch();

  useState(() => {
    const makeFetch = async () => {
      await fetchData(fullUrl);
    };
    makeFetch();
  }, []);

  if (loading || !data) return <Loading />;

  const [details] = data.meals || data.drinks;

  return (
    <div>
      <Header />
    </div>
  );
}

export default RecipeDetails;
