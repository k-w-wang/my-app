'use client'
import { Menu } from 'antd'
import { useSelectedLayoutSegment } from 'next/navigation'
import NavLink from '../NavLink'

export default function NavMenu() {
  const segment = useSelectedLayoutSegment()
  console.log('segment', segment);
  
  const items = [
    {
      key: "home",
      label: <NavLink href="/home">Home</NavLink>,
    },
    {
      key: "pdfpreview",
      label: <NavLink href="/pdfpreview">PDF预览</NavLink>
    },
    {
      key: "pdfpreviewv2",
      label: <NavLink href="/pdfpreviewv2">PDF预览优化</NavLink>,
    },
    {
      key: "splittext",
      label: <NavLink href="/splittext">文本分段</NavLink>,
    },
    {
      key: "streamoutput",
      label: <NavLink href="/streamoutput">Markdown渲染</NavLink>,
    },
    {
      key: "flattotree",
      label: <NavLink href="/flattotree">数组转树</NavLink>,
    },
    {
      key: "treetoflat",
      label: <NavLink href="/treetoflat">数组转树</NavLink>,
    },
    {
      key: "throttle",
      label: <NavLink href="/throttle">节流</NavLink>,
    },
    {
      key: "debounce",
      label: <NavLink href="/debounce">防抖</NavLink>,
    },
    {
      key: "chat",
      label: <NavLink href="/chat">对话</NavLink>,
    },
  ];
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={segment ? [segment] : ['home']}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  )
}
