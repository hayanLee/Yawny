import { useState } from 'react';

function useListSelection<T>(initialItems: T[], getKey: (item: T) => string) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(initialItems.map((item) => getKey(item))); // key 배열을 저장 (선택 여부 확인, 토글 시 문자열 비교가 간단)

  const selectAll = (checked: boolean) => {
    if (checked) setSelectedKeys(initialItems.map((item) => getKey(item)));
    else setSelectedKeys([]);
  };

  const toggleItem = (item: T, checked: boolean) => {
    const itemKey = getKey(item);
    setSelectedKeys((prev) => (checked ? [...prev, itemKey] : prev.filter((k) => k !== itemKey)));
  };

  const isSelected = (item: T) => {
    const itemKey = getKey(item);
    return selectedKeys.includes(itemKey);
  };

  const deleteItem = (itemKey: string) => {
    setSelectedKeys((prev) => prev.filter((p) => p !== itemKey));
  };

  return { selectedKeys, toggleItem, selectAll, isSelected, deleteItem };
}

export default useListSelection;
