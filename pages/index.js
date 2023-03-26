import { Table, useAsyncList, useCollator } from "@nextui-org/react";
import { Layout } from "./layout";

export default function App() {
  const collator = useCollator({ numeric: true });
  async function load({ signal }) {
    const res = await fetch("https://engineering-task.elancoapps.com/api/raw", {
      signal,
    });
    const json = await res.json();

    // do group by ServiceName and Sum of Cost & ConsumedQuantity
    var result = [];
    json.reduce(function(res, value) {
        value.Cost = Number(value.Cost);
        value.ConsumedQuantity = Number(value.ConsumedQuantity);
        if (!res[value.ServiceName]) {
        res[value.ServiceName] = { ServiceName: value.ServiceName, Cost: 0, ConsumedQuantity: 0 };
        result.push(res[value.ServiceName])
        }
        res[value.ServiceName].Cost += value.Cost;
        res[value.ServiceName].ConsumedQuantity += value.ConsumedQuantity;
        return res;
    }, {});
    return {
      items: result,
    };
  }
  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  const list = useAsyncList({ load, sort });
  return (
    <Layout>
        <Table
         lined
         bordered
         shadow={true}
        aria-label="Example static collection table"
        css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        >
        <Table.Header>
            <Table.Column key="ServiceName" allowsSorting>
                Name
            </Table.Column>
            <Table.Column key="Cost" allowsSorting>
                Cost
            </Table.Column>
            <Table.Column key="ConsumedQuantity" allowsSorting>
                Consumed Quantity
            </Table.Column>
        </Table.Header>
        <Table.Body items={list.items} loadingState={list.loadingState}>
            {(item) => (
            <Table.Row key={item.ServiceName + item.Cost}>
                {(columnKey) => <Table.Cell>{
                    columnKey != 'ServiceName' ? Math.round(item[columnKey]*100)/100 : item[columnKey]
                }</Table.Cell>}
            </Table.Row>
            )}
        </Table.Body>
        </Table>
    </Layout>
  );
}