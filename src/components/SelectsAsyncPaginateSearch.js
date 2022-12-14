import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

// const StyledWrapperSelects = styled.div`
//   display: flex;
//   align-items: center;
//   @media (max-width: ${({ theme }) => theme.default.breakpoints.sm}) {
//     margin-top: 20px;
//     padding-bottom: 0;
//   }
// `;

const customStylesSelect = (styles) => ({
  container: (provided) => ({
    ...provided,
    ...styles?.container,
  }),
  option: (provided) => ({
    ...provided,
    ...styles?.option,
  }),
  control: (provided) => ({
    ...provided,
    minWidth: 200,
    width: "100%",
    ...styles?.control,
  }),
  singleValue: (provided, state) => {
    const transition = "opacity 300ms";
    return { ...provided, transition };
  },
});

// getSearchRequest = async (searchQuery, page) => {
//   const response = await getSearchRequest(searchQuery, page);
//     return {
//       options: response.payload.results,
//       count: response.payload.count,
//     }
// }

function SelectsDashboardSearch({
  setSelected,
  selected,
  settings,
  styles,
  title = "",
}) {
  // FUNCTIONS
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    // const payload = await settings.getSearchRequest(searchQuery, page);
    // if (!payload?.options || !payload.count) return;
    const payload = {};
    console.log(searchQuery, "searchQuery");
    return {
      options: payload?.options || [
        {
          id: 0,
          title,
        },
      ],
      hasMore: loadedOptions.length + payload?.options?.length < payload?.count,
      additional: {
        page: page + 1,
      },
    };
  };

  let settingsAsyncPaginate = {};
  if (settings) {
    const {
      getOptionValue,
      getOptionLabel,
      getSearchRequest,
      ...otherSettings
    } = settings;
    if (settings.getOptionValue)
      settingsAsyncPaginate.getOptionValue = settings.getOptionValue;
    if (settings.getOptionLabel)
      settingsAsyncPaginate.getOptionLabel = settings.getOptionLabel;
    if (settings.getSearchRequest)
      settingsAsyncPaginate.loadOptions = loadOptions;
    settingsAsyncPaginate = { ...settingsAsyncPaginate, ...otherSettings };
  }

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  return (
    <div
    // style={styles?.root}
    >
      {/* { title 
          ? <Typography variant={'h4'} style={{ paddingRight: 10, ...styles?.title }}>
              {title}
            </Typography>
          : null
      } */}
      <AsyncPaginate
        debounceTimeout={700}
        styles={customStylesSelect(styles)}
        value={selected}
        onChange={onChange}
        placeholder="Select"
        additional={{
          page: 1,
        }}
        {...settingsAsyncPaginate}
      />
    </div>
  );
}

export default SelectsDashboardSearch;
