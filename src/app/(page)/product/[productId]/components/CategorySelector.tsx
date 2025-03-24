import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Category } from '@/typed';
import React, { useState } from 'react'

type Props = {
    defaultValue:string;
    categories: Category[];
    onChange: (category: string) => void;
}

const CategorySelector = ({
    categories,
    onChange,
    defaultValue = "Select category"
}: Props) => {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState<string>(defaultValue);

    const renderCategory = (items: Category[]) => {
        const content = items.map((item) => {
            if (item.children.length) {
                return (
                    <DropdownMenuSub key={item.id}>
                        <DropdownMenuSubTrigger className='cursor-pointer'>{item.name}</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="p-0 w-[200px]">
                            {<Command key={item.id} defaultValue={item.children[0]?.id.toString()}>
                                <CommandList>
                                    <CommandGroup>
                                        {renderCategory(item.children)}
                                    </CommandGroup>
                                </CommandList>
                            </Command>}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            } else {
                return (
                    <CommandItem
                        className='cursor-pointer'
                        key={item.id}
                        value={item.name.toString()}
                        onSelect={(value) => {
                            setLabel(value);
                            onChange(value)
                            setOpen(false)
                        }}
                    >
                        {item.name}
                    </CommandItem>
                )
            }
        });

        return content;
    }
    return (
        <div className="flex w-[300px] flex-col items-end  rounded-md border ">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='w-full h-full'>
                        {label ?? "Select category"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                    <DropdownMenuGroup>
                        {renderCategory(categories)}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CategorySelector