import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';
export const sender1 = "10.0.0.7"
export const sender2 = "192.168.182.29"
export const netstat1 = [
  {
    "Process":  "[ServiceHub.SettingsHost.exe]",
    "Protocole":  "TCP",
    "State":  "ESTABLISHED",
    "ForeignAddressPort":  "9354",
    "ForeignAddressIP":  "52.166.127.37"
},
{
    "Process":  "[Video.UI.exe]",
    "Protocole":  "TCP",
    "State":  "CLOSE_WAIT",
    "ForeignAddressPort":  "443",
    "ForeignAddressIP":  "95.100.204.13"
},
{
    "Process":  "[chrome.exe]",
    "Protocole":  "TCP",
    "State":  "ESTABLISHED",
    "ForeignAddressPort":  "5228",
    "ForeignAddressIP":  "74.125.206.188"
},
{
    "Process":  "[Teams.exe]",
    "Protocole":  "TCP",
    "State":  "ESTABLISHED",
    "ForeignAddressPort":  "443",
    "ForeignAddressIP":  "52.113.194.132"
},
{
    "Process":  "[msedge.exe]",
    "Protocole":  "TCP",
    "State":  "ESTABLISHED",
    "ForeignAddressPort":  "443",
    "ForeignAddressIP":  "157.240.221.60"
},
{
    "Process":  "[msedge.exe]",
    "Protocole":  "TCP",
    "State":  "ESTABLISHED",
    "ForeignAddressPort":  "443",
    "ForeignAddressIP":  "157.240.221.60"
}];
export const netstat2 = [
    {
        "ForeignAddressIP":  "173.194.76.188",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "[chrome.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "56008",
        "ForeignAddressPort":  "5228"
    },
    {
        "ForeignAddressIP":  "35.190.243.159",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "[Spotify.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "56352",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "192.0.73.2",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "[chrome.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "59694",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "192.117.112.145",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "[chrome.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "59698",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "3.127.156.149",
        "Protocole":  "TCP",
        "State":  "SYN_SENT",
        "Process":  "[chrome.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "59749",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "3.127.156.149",
        "Protocole":  "TCP",
        "State":  "SYN_SENT",
        "Process":  "[chrome.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "59752",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "3.127.156.149",
        "Protocole":  "TCP",
        "State":  "SYN_SENT",
        "Process":  "[chrome.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "59756",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "151.101.114.248",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "[Spotify.exe]",
        "LocalAddressIP":  "10.0.0.7",
        "LocalAddressPort":  "59759",
        "ForeignAddressPort":  "443"
    },
    {
        "ForeignAddressIP":  "1.1.1.1",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "Dnscache[svchost.exe]",
        "LocalAddressIP":  "10.0.0.15",
        "LocalAddressPort":  "57933",
        "ForeignAddressPort":  "53"
    },
    {
        "ForeignAddressIP":  "52.114.128.52",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "Process":  "[Teams.exe]",
        "LocalAddressIP":  "10.0.0.15",
        "LocalAddressPort":  "59679",
        "ForeignAddressPort":  "443"
    },
    {
        "Process":  "[msedge.exe]",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "ForeignAddressPort":  "443",
        "ForeignAddressIP":  "157.240.221.60"
    },
    {
        "Process":  "[msedge.exe]",
        "Protocole":  "TCP",
        "State":  "ESTABLISHED",
        "ForeignAddressPort":  "443",
        "ForeignAddressIP":  "157.240.221.60"
    }
];