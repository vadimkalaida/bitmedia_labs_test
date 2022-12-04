import React from 'react';
import './TableContentComponent.scss';
import {useAppSelector} from "../../../../hooks/redux.hooks";
import headers from "../table-header/headers";
import cutWord from "../../../../utils/cutWord.util";
import getDate from "../../../../utils/date.util";
import SuspenseFallBack from "../../../suspense/SuspenseFallBack";

const TableContentComponent = () => {
  const data = useAppSelector(state => state.data.currentData);

  const navigateFunc = (mainLink: string, value: string) => {
    window.open(mainLink + value);
  };

  return(
    <div className="tableContent">
      { data && data.length > 0 ? data.map((item, index) =>
        <div className="tableRow" key={ item.transaction_id } style={{ background: index !== 0 && index % 2 !== 0 ? '#F1F1F1' : '#FBFBFB' }}>
          { Object.values(item).map((tableItem, tableItemIndex) =>
            <div className="tableItem" style={{ width: headers[tableItemIndex].width }} key={ tableItemIndex }>
              <p className={`tableItemParagraph ${ headers[tableItemIndex].link ? 'link' : '' }`}
                 onClick={headers[tableItemIndex].link ? () => navigateFunc(headers[tableItemIndex].link, tableItem.toString()) : () => {}}>
                { headers[tableItemIndex].name.toLowerCase() === 'date' ? getDate(new Date(tableItem)) : headers[tableItemIndex].maxSize ? cutWord(tableItem, headers[tableItemIndex].maxSize) : tableItem }
              </p>
            </div>
          ) }
        </div>
      ) : <SuspenseFallBack minHeight="448px" CustomHTML={() => <p>Maybe there is no data, if you see this message for too long</p>} /> }
    </div>
  );
};

export default TableContentComponent;