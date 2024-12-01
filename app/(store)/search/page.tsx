import React from "react";

type Props = {
  searchParams: {
    query: string;
  };
};

const SearchPage = async ({ searchParams }: Props) => {
  const { query } = await searchParams;
  return <div>SearchPage for {query}</div>;
};

export default SearchPage;
