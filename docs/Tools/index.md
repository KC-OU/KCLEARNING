# Tools

## Overview
This page serves as a comprehensive reference guide for cybersecurity and penetration testing tools. Each tool entry includes:

- **Description**: A detailed explanation of the tool's purpose, capabilities, and primary use cases
- **TLDR**: A quick summary for users who need fast answers about what the tool does
- **Category**: Classification within cybersecurity domains (e.g., reconnaissance, exploitation, forensics)

Whether you're a security researcher, penetration tester, or cybersecurity student, use this resource to quickly identify the right tool for your security assessment needs.

---

## Extensive Cyber Security and Kali Linux Tools Master List
This document provides a highly structured, extensive directory of operational cybersecurity tools. It synthesizes primary industry frameworks along with deep integrations extracted from Kali Linux system installations, purposefully filtering out base libraries to focus purely on functional security software.

???+ info "Only Adding Known Tools"

    I would be only adding known tools to this list, as no point of me adding tools, that I have not learnt yet

### Social Engineering {.collapsible}
Tools engineered to exploit systemic human and credential authorization workflows through phishing vectors, credential harvesting, or replication of authentication workflows.

???+ info "No Tool will be added to this section"

    There is no Social Engineering Tool will be added to this section as most of them are python sctipts or web hosted tools. But if you have any idea or tool for this category please follow the trello board and add a suggestion

### Password Cracking & Wordlist Generation {.collapsible}
Utilities tasked with cryptographic verification analysis, dictionary synthesis, and computational parallel extraction of plain-text states.

=== "Hashcat"
    Hashcat is the world's fastest, GPU-accelerated open-source password cracking and recovery tool, used by cybersecurity professionals to test password strength. 

    ```text { .tldr }
    Fast and advanced password recovery tool.
    More information: https://hashcat.net/wiki/doku.php?id=hashcat.

    - Perform a brute-force attack (mode 3) with the default hashcat mask:
    hashcat --hash-type hash_type_id --attack-mode 3 hash_value

    - Perform a brute-force attack (mode 3) with a known pattern of 4 digits:
    hashcat --hash-type hash_type_id --attack-mode 3 hash_value "?d?d?d?d"

    - Perform a brute-force attack (mode 3) using at most 8 of all printable ASCII characters:
    hashcat --hash-type hash_type_id --attack-mode 3 --increment hash_value "?a?a?a?a?a?a?a?a"

    - Perform a dictionary attack (mode 0) using a wordlist:
    hashcat --hash-type hash_type_id --attack-mode 0 hash_value path/to/wordlist.txt

    - Run a dictionary attack (mode 0) using the specified wordlist, applying rule-based transformations to mutate candidate passwords:
    hashcat --hash-type hash_type_id --attack-mode 0 --rules-file path/to/file.rule hash_value path/to/wordlist.txt

    - Perform a combination attack (mode 1) using the concatenation of words from two different custom dictionaries:
    hashcat --hash-type hash_type_id --attack-mode 1 hash_value path/to/dictionary1.txt path/to/dictionary2.txt

    - Show result of an already cracked hash:
    hashcat --show hash_value

    - Show all example hashes:
    hashcat --example-hashes
    ```


=== "John the Ripper"
    John the Ripper is a tool designed to help systems administrators to find weak (easy to guess or crack through brute force) passwords, and even automatically mail users warning them about it, if it is desired.

    ```text { .tldr }
    Password cracker.
    More information: https://www.openwall.com/john/.

     - Crack password hashes:
    john path/to/hashes.txt

    - Show passwords cracked:
    john --show path/to/hashes.txt

    - Display users' cracked passwords by user identifier from multiple files:
    john --show --users=user_ids path/to/hashes1.txt path/to/hashes2.txt ...

    - Crack password hashes, using a custom wordlist:
    john --wordlist=path/to/wordlist.txt path/to/hashes.txt

    - List available hash formats:
    john --list=formats

    - Crack password hashes, using a specific hash format:
    john --format=md5crypt path/to/hashes.txt

    - Crack password hashes, enabling word mangling rules:
    john --rules path/to/hashes.txt

    - Restore an interrupted cracking session from a state file, e.g. mycrack.rec:
    john --restore=path/to/mycrack.rec
    ```
=== "Hydra"
    Hydra is a parallelized login cracker which supports numerous protocols to attack. It is very fast and flexible, and new modules are easy to add.
    ```text { .tldr }
    Online password guessing tool.
    Protocols supported include FTP, HTTP(S), SMTP, SNMP, XMPP, SSH, and more.
    More information: https://manned.org/hydra.

    - Start Hydra's wizard:
    hydra-wizard

    - Guess SSH credentials using a given username and a list of passwords:
    hydra -l username -P path/to/wordlist.txt host_ip ssh

    - Guess HTTPS webform credentials using two specific lists of usernames and passwords ("https_post_request" can be like "username=^USER^&password=^PASS^"):
    hydra -L path/to/usernames.txt -P path/to/wordlist.txt host_ip https-post-form "url_without_host:https_post_request:login_failed_string"

    - Guess FTP credentials using usernames and passwords lists, specifying the number of threads:
    hydra -L path/to/usernames.txt -P path/to/wordlist.txt -t n_tasks host_ip ftp

    - Guess MySQL credentials using a username and a passwords list, exiting when a username/password pair is found:
    hydra -l username -P path/to/wordlist.txt -f host_ip mysql

    - Guess RDP credentials using a username and a passwords list, showing each attempt:
    hydra -l username -P path/to/wordlist.txt -V rdp://host_ip

    - Guess IMAP credentials on a range of hosts using a list of colon-separated username/password pairs:
    hydra -C path/to/username_password_pairs.txt imap://[host_range_cidr]

    - Guess POP3 credentials on a list of hosts using usernames and passwords lists, exiting when a username/password pair is found:
    hydra -L path/to/usernames.txt -P path/to/wordlist.txt -M path/to/hosts.txt -F pop3
    ```

## Web Application Assessment {.collapsible}
Engines optimized to isolate validation bugs, injection flaws, configuration gaps, and code routing exceptions across web topologies.

=== "Burpsuite"
    Burp Suite is the industry-standard software platform used for web application security testing and penetration testing. Acting as a proxy between your browser  and the target server, it allows security professionals and developers to intercept, inspect, and modify web traffic in real time to uncover and exploit vulnerabilitie
    
    ``` { .tldr}
     burpsuite

    A GUI based application mainly used in web application penetration testing.
    More information: https://portswigger.net/burp/documentation/desktop/troubleshooting/launch-from-command-line.

    - Start Burp Suite:
    burpsuite

    - Start Burp Suite using the default configuration:
    burpsuite --use-defaults

    - Open a specific project file:
    burpsuite --project-file=path/to/file

    - Load a specific configuration file:
    burpsuite --config-file=path/to/file

    - Start without extensions:
    burpsuite --disable-extensions
    ```
=== "Nikto"
    Nikto is an Open Source (GPL) web server scanner which performs comprehensive tests against web servers for multiple items, including thousands of potentially dangerous files/programs, checks for outdated versions of over 1500 server components, and version specific problems on hundreds of servers. It also checks for server configuration items such as the presence of multiple index files, HTTP server options, and will attempt to identify installed web servers and software. Scan items and plugins are frequently updated and can be automatically updated.

    ```{ .tldr}
    nikto

    Web server scanner which performs tests against web servers for multiple items.
    More information: http://cirt.net/nikto/.

    - Perform a basic Nikto scan against a target host:
    perl nikto.pl -host 192.168.0.1

    - Specify the port number when performing a basic scan:
    perl nikto.pl -host 192.168.0.1 -port 443

    - Scan ports and protocols with full URL syntax:
    perl nikto.pl -host https://192.168.0.1:443/

    - Scan multiple ports in the same scanning session:
    perl nikto.pl -host 192.168.0.1 -port 80,88,443

    - Update to the latest plugins and databases:
    perl nikto.pl -update
    ```
=== "Dirb"
    DIRB is a Web Content Scanner. It looks for existing (and/or hidden) Web Objects. It basically works by launching a dictionary based attack against a web server and analyzing the responses.

    ```{ .tldr}
    dirb

    Scan HTTP-based webservers for directories and files.
    More information: https://manned.org/dirb.

    - Scan a webserver using the default wordlist:
    dirb https://example.org

    - Scan a webserver using a custom wordlist:
    dirb https://example.org path/to/wordlist.txt

    - Scan a webserver non-recursively:
    dirb https://example.org -r

    - Scan a webserver using a specified user-agent and cookie for HTTP-requests:
    dirb https://example.org -a user_agent_string -c cookie_string
    ```

=== "Dirbuster"
    DirBuster is a multi threaded java application designed to brute force directories and files names on web/application servers. Often is the case now of what looks like a web server in a state of default installation is actually not, and has pages and applications hidden within. DirBuster attempts to find these.

    ```{ .tldr}
    dirb

    Scan HTTP-based webservers for directories and files.
    More information: https://manned.org/dirb.

    - Scan a webserver using the default wordlist:
    dirb https://example.org

    - Scan a webserver using a custom wordlist:
    dirb https://example.org path/to/wordlist.txt

    - Scan a webserver non-recursively:
    dirb https://example.org -r

    - Scan a webserver using a specified user-agent and cookie for HTTP-requests:
    dirb https://example.org -a user_agent_string -c cookie_string
    ```

## Exploitation & Command and Control (C2) {.collapsible}
Payload synthesizers, execution loops, and runtime remote control software used to map execution paths.

=== "Metasploit Framework / msfconsole"
    The Metasploit Framework is an open-source, Ruby-based penetration testing platform. It allows security professionals to discover vulnerabilities, execute real-world cyberattacks, and validate defensive controls. Often described as the "Swiss Army knife" for ethical hacking, it provides pre-built modules for the entire attack lifecycle, from reconnaissance to post-exploitation.

    ```{ .tldr}
     msfconsole

    Console for the Metasploit Framework.
    Note: Run `sudo msfdb init` to enable the Metasploit database backend prior to launching `msfconsole`.
    More information: https://docs.rapid7.com/metasploit/msf-overview/.

    - Launch the interactive console (append --quiet to suppress the startup banner):
    sudo msfconsole

    - Execute console commands (Note: Use ; for passing multiple commands):
    sudo msfconsole --execute-command "use auxiliary/scanner/portscan/tcp; set PORTS 80,443; set RHOSTS example.com; run; quit"

    - Run a specific resource file:
    sudo msfconsole --resource path/to/file.rc

    - [Interactive] Show specific type of modules:
    show auxiliary|encoders|evasion|exploits|nops|payloads|post

    - [Interactive] Use a module:
    use auxiliary/scanner/portscan/syn

    - [Interactive] Show module options (module needs to be loaded first):
    show options

    - [Interactive] Set value of variable:
    set variable_name value

    - [Interactive] Run a module (module needs to be loaded and options need to be set first):
    run|exploit
    ```

=== "Bloody AD"
    This tool can perform specific LDAP calls to a domain controller in order to perform AD privesc. BloodyAD supports authentication using cleartext passwords, pass-the-hash, pass-the-ticket or certificates and binds to LDAP services of a domain controller to perform AD privesc.

    ???+ info "NO TLDR"
        This tool does not have a tldr, as found the User Guide on Github or bloodyAD -h [AD](https://github.com/CravateRouge/bloodyAD/wiki/User-Guide)


    ```bash
    $ bloodyAD -h

    usage: bloodyAD [-h] [-d DOMAIN] [-u USERNAME] [-p PASSWORD]
                [-k [KERBEROS ...]] [-f {b64,hex,aes,rc4,default}]
                [-c [CERTIFICATE]] [-s] -H HOST [-i DC_IP] [--dns DNS]
                [-t TIMEOUT] [--gc] [-v {QUIET,INFO,DEBUG,TRACE}] [--json]
                {add,get,msldap,remove,set} ...

    AD Privesc Swiss Army Knife

    options:
    -h, --help            show this help message and exit
     -d DOMAIN, --domain DOMAIN
                        Domain used for NTLM authentication
    -u USERNAME, --username USERNAME
                        Username used for NTLM authentication
    -p PASSWORD, --password PASSWORD
                        password or LMHASH:NTHASH for NTLM authentication,
                        password or AES/RC4 key for kerberos, password for
                        certificate (Do not specify to trigger integrated
                        windows authentication)
    -k [KERBEROS ...], --kerberos [KERBEROS ...]
                        Enable Kerberos authentication. If '-p' is provided it
                        will try to query a TGT with it. You can also provide
                        a list of one or more optional keywords as '-k
                        kdc=192.168.100.1 kdcc=192.168.150.1
                        realmc=foreign.realm.corp
                        <keyfile_type>=/home/silver/Admin.ccache',
                        <keyfile_type> being ccache, kirbi or keytab, 'kdc'
                        being the kerberos server for the keyfile provided and
                        'realmc' and 'kdcc' for cross realm (the realm of the
                        '--host' provided)
    -f {b64,hex,aes,rc4,default}, --format {b64,hex,aes,rc4,default}
                        Specify format for '--password' or '-k <keyfile>'
    -c [CERTIFICATE], --certificate [CERTIFICATE]
                        Schannel authentication or krb pkinit if -k also
                        provided, e.g: "path/to/key:path/to/cert" (Use Windows
                        Certstore with krb if left empty)
    -s, --secure          Use LDAP/GC over TLS (LDAPS/GCS). Use -ss to remove
                        all encryption/signing (useful for debug).
    -H HOST, --host HOST  Hostname or IP of the DC (ex: my.dc.local or
                        172.16.1.3)
    -i DC_IP, --dc-ip DC_IP
                        IP of the DC (useful if you provided a --host which
                        can't resolve)
    --dns DNS             IP of the DNS to resolve AD names (useful for inter-
                        domain functions)
    -t TIMEOUT, --timeout TIMEOUT
                        Connection timeout in seconds
    --gc                  Connect to Global Catalog (GC)
    -v {QUIET,INFO,DEBUG,TRACE}, --verbose {QUIET,INFO,DEBUG,TRACE}
                        Adjust output verbosity
    --json                Output results in JSON format

    Commands:
    {add,get,msldap,remove,set}
    add                 [ADD] function category
    get                 [GET] function category
    msldap              [MSLDAP] function category
    remove              [REMOVE] function category
    set                 [SET] function category
    ```

=== "Evil-WinRM"
    evil-winrm-py is a python-based tool for executing commands on remote Windows machines using the WinRM (Windows Remote Management) protocol. It provides an interactive shell with enhanced features like file upload/download, command history, and colorized output. It supports various authentication methods including NTLM, Pass-the-Hash, Certificate, and Kerberos.

    ```{ .tldr}
    evil-winrm

    Windows Remote Management (WinRM) shell for pentesting.
    Once connected, we get a PowerShell prompt on the target host.
    More information: https://github.com/Hackplayers/evil-winrm.

    - Connect to a host and start an interactive session:
    evil-winrm --ip ip_address --user user --password password

    - Connect to a host using pass-the-hash authentication instead of a password:
    evil-winrm --ip ip_address --user user --hash nt_hash

    - Connect to a host, specifying directories for PowerShell scripts and executables:
    evil-winrm --ip ip_address --user user --password password --scripts path/to/scripts --executables path/to/executables

    - Connect to a host, using SSL:
    evil-winrm --ip ip_address --user user --password password --ssl --pub-key path/to/pubkey --priv-key path/to/privkey

    - [Interactive] Upload a file to the host:
    upload path/to/local_file path/to/remote_file

    - [Interactive] List all loaded PowerShell functions:
    menu

    - [Interactive] Load a PowerShell script from the --scripts directory:
    script.ps1

    - [Interactive] Invoke a binary on the host from the --executables directory:
    Invoke-Binary binary.exe
    ```

=== "ExploitDB / SearchSploit"
    This is the official repository of The Exploit Database, a project sponsored by Offensive Security.
    The Exploit Database is an archive of public exploits and corresponding vulnerable software, developed for use by penetration testers and vulnerability researchers. Its aim is to serve as the most comprehensive collection of exploits gathered through direct submissions, mailing lists, and other public sources, and present them in a freely-available and easy-to-navigate database. The Exploit Database is a repository for exploits and proof-of-concepts rather than advisories, making it a valuable resource for those who need actionable data right away.

    ```{ .tldr}
      searchsploit

     Search Exploit Database for exploits, shellcodes and/or papers.
     If known version numbers are used as search terms, exploits for both the exact version and others whose version range covers the one specified are shown.
     More information: https://www.exploit-db.com/searchsploit.

    - Search for an exploit, shellcode, or paper:
    searchsploit search_terms

    - Search for a known specific version, e.g. sudo version 1.8.27:
    searchsploit sudo 1.8.27

    - Show the exploit-db link to the found resources:
    searchsploit --www search_terms

    - Copy the resource to the current directory (requires the number of the exploit):
    searchsploit --mirror exploit_number

    - Examine the resource, using the pager defined in the $PAGER environment variable:
    searchsploit --examine exploit_number

    - Update the local Exploit Database:
    searchsploit --update

    - Search for the [c]ommon [v]ulnerabilities and [e]xposures (CVE) value:
    searchsploit --cve 2021-44228

    - Check results in nmap's XML output with service version (nmap -sV -oX nmap-output.xml) for known exploits:
    searchsploit --nmap path/to/nmap-output.xml
    ```

=== "SQLMap"
    sqlmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers. It comes with a powerful detection engine, many niche features for the ultimate penetration tester, and a broad range of switches including database fingerprinting, over data fetching from the database, accessing the underlying file system, and executing commands on the operating system via out-of-band connections.

    ```{ .tldr}
    sqlmap

    Detect and exploit SQL injection flaws.
    More information: https://github.com/sqlmapproject/sqlmap/wiki/Usage.

    - Run sqlmap against a single target URL:
    python sqlmap.py --url "http://www.example.com/vuln.php?id=1"

    - Send data in a POST request (--data implies POST request):
    python sqlmap.py --url "http://www.example.com/vuln.php" --data="id=1"

    - Change the parameter delimiter (& is the default):
    python sqlmap.py --url "http://www.example.com/vuln.php" --data="query=foobar;id=1" --param-del=";"

    - Select a random User-Agent from ./txt/user-agents.txt and use it:
    python sqlmap.py --url "http://www.example.com/vuln.php" --random-agent

    - Provide user credentials for HTTP protocol authentication:
    python sqlmap.py --url "http://www.example.com/vuln.php" --auth-type Basic --auth-cred "testuser:testpass"

    ```

## Information Gathering (OSINT, DNS & Recon)
Target profiling frameworks, asset mappers, and boundary footprint discovery scrapers.

=== "Nmap / Masscan"
    Nmap (short for Network Mapper) is a powerful, open-source utility used by cybersecurity professionals and system administrators to discover devices on a network, map their topology, and audit their security. It identifies active hosts, open ports, running services, and the operating systems of connected machines. 

    ```{ .tldr}
    
    nmap
    Network exploration tool and security/port scanner.
    Some features (e.g. SYN scan) activate only when `nmap` is run with root privileges.
    See also: `hping3`, `masscan`, `naabu`, `rustscan`, `zmap`.
    More information: https://nmap.org/book/man.html.

    - Scan the top 1000 ports of a remote host with various [v]erbosity levels:
    nmap -v1|2|3 ip_or_hostname

    - Run a ping sweep over an entire [s]ub[n]et or individual hosts very aggressively:
    nmap -T5 -sn 192.168.0.0/24|ip_or_hostname1,ip_or_hostname2,...

    - Enable OS detection, version detection, script scanning, and traceroute of hosts from a file:
    sudo nmap -A -iL path/to/file.txt

    - Scan a specific list of [p]orts (use -p- for all ports from 1 to 65535):
    nmap -p port1,port2,... ip_or_host1,ip_or_host2,...

    - Perform service and version detection of the top 1000 ports using default NSE scripts, writing results (-oA) to output files:
    nmap -sC -sV -oA top-1000-ports ip_or_host1,ip_or_host2,...

    - Scan target(s) carefully using default and safe NSE scripts:
    nmap --script "default and safe" ip_or_host1,ip_or_host2,...

    - Scan for web servers running on standard [p]orts 80 and 443 using all available http-* NSE scripts:
    nmap --script "http-*" ip_or_host1,ip_or_host2,... -p 80,443

    - Attempt evading IDS/IPS detection by using an extremely slow scan (-T0), [D]ecoy source addresses, [f]ragmented packets, random data and other methods:
    sudo nmap -T0 -D decoy_ip1,decoy_ip2,... --source-port 53 -f --data-length 16 -Pn ip_or_host
    ```

=== "Bloodhound"
    BloodHound is an open-source cybersecurity tool that uses graph theory to map and analyze Active Directory (AD) and Azure environments. It reveals hidden privilege relationships and attack paths, allowing both red teams to identify vulnerabilities for lateral movement and blue teams to remediate security risks.

    ```{ .tldr}
    A Python ingestor for BloodHound, used to enumerate Active Directory relationships. More information: https://github.com/dirkjanm/BloodHound.py#usage.

    Collect all data using default collection methods (includes groups, sessions, and trusts):
    bloodhound-python --username username --password password --domain domain

    Collect data using Kerberos authentication without requiring a plaintext password:
    bloodhound-python --collectionmethod All --kerberos --domain domain

    Authenticate using NTLM hashes instead of a password:
    bloodhound-python --collectionmethod All --username username --hashes LM:NTLM --domain domain

    Specify a custom name server for DNS queries:
    bloodhound-python --collectionmethod All --username username --password password --domain domain --nameserver nameserver

    Save the output files as a compressed ZIP archive:
    bloodhound-python --collectionmethod All --username username --password password --domain domain --zip
    ```
=== "Enum4Linux"
    Enum4Linux is a popular command-line enumeration tool designed for Windows and Samba environments. It acts as a wrapper around Samba tools (like `smbclient`, `rpcclient`, `net`, and `nmblookup`) to extract critical Active Directory and network information over SMB.

    ```{ .tldr}
    enum4linux

    Enumerate Windows and Samba information from remote systems.
    More information: https://labs.portcullis.co.uk/tools/enum4linux/.

    - Try to enumerate using all methods:
    enum4linux -a remote_host

    - Enumerate using given login credentials:
    enum4linux -u user_name -p password remote_host

    - List usernames from a given host:
    enum4linux -U remote_host

    - List shares:
    enum4linux -S remote_host

    - Get OS information:
    enum4linux -o remote_host
    ```

    
=== "theHarvester"
    theHarvester is a simple to use, yet powerful tool designed to be used during the reconnaissance stage of a red team assessment or penetration test. It performs open source intelligence (OSINT) gathering to help determine a domain's external threat landscape. The tool gathers names, emails, IPs, subdomains, and URLs by using multiple public resources that include:

    ```{ .tldr}
    theHarvester

    A tool designed to be used in the early stages of a penetration test.
    More information: https://github.com/laramies/theHarvester.

    - Gather information on a domain using Google:
    theHarvester --domain domain_name --source google

    - Gather information on a domain using multiple sources:
    theHarvester --domain domain_name --source duckduckgo,bing,crtsh

    - Change the limit of results to work with:
    theHarvester --domain domain_name --source google --limit 200

    - Save the output to two files in XML and HTML format:
    theHarvester --domain domain_name --source google --file output_file_name

    - Display help:
    theHarvester --help
    ```

=== "Rustscan"
    RustScan is an ultra-fast, open-source network port scanner written in Rust that is designed to find open ports across an entire system in seconds. By using asynchronous IO, it can scan all 65,535 TCP ports on a single host in roughly 3 seconds, significantly reducing the reconnaissance time required during security assessments. Rather than trying to fully replace Nmap, RustScan acts as a high-speed pre-scanner that automatically pipes its discovered open ports directly into Nmap for deep service and version enumeration.

    ```{ .tldr}
    rustscan

    Modern Port Scanner written in Rust.
    Note: `nmap` must be installed for some of the examples below to work.
    See also: `hping3`, `masscan`, `naabu`, `nmap`, `zmap`.
    More information: https://github.com/bee-san/RustScan/wiki.

    - Scan all ports of one or more comma-delimited addresses using the default values:
    rustscan --addresses ip_or_hostname1,ip_or_hostname2,...

    - Scan the top 1000 ports with service and version detection:
    rustscan --top --addresses address

    - Scan a specific list of ports:
    rustscan --ports port1,port2,... --addresses address

    - Scan a specific range of ports:
    rustscan --range start-end --addresses address

    - Invoke nmap functionalities (Nmap's OS detection and default scripts):
    rustscan --addresses address -- -O --script=default

    - Scan with custom batch size (default: 4500) and timeout (default: 1500ms):
    rustscan --batch-size batch_size --timeout timeout --addresses address

    - Scan with specific port order:
    rustscan --scan-order serial|random --addresses address

    - Scan in greppable mode (only output of the ports, no nmap):
    rustscan --greppable --addresses address
    ```


=== "autorecon"
    AutoRecon is a multi-threaded network reconnaissance tool which performs automated enumeration of services. It is intended as a time-saving tool for use in CTFs and other penetration testing environments (e.g. OSCP). It may also be useful in real-world engagements.

    ```{ .tldr}
    autorecon

    A multi-threaded network reconnaissance tool which performs automated enumeration of services.
    More information: https://github.com/AutoRecon/AutoRecon.

    - Perform reconnaissance on target host(s) (detailed scan results will be dumped in results):
    sudo autorecon host_or_ip1,host_or_ip2,...

    - Perform reconnaissance on target(s) from a file:
    sudo autorecon --target-file path/to/file

    - Output results to a different directory:
    sudo autorecon --output path/to/results host_or_ip1,host_or_ip2,...

    - Limit scanning to specific ports and protocols (T for TCP, U for UDP, B for both):
    sudo autorecon --ports T:21-25,80,443,U:53,B:123 host_or_ip1,host_or_ip2,...
    ```


=== "dnsrecon"
    DNSRecon is a Python port of a Ruby script that I wrote to learn the language and about DNS in early 2007. This time I wanted to learn about Python and extend the functionality of the original tool and in the process re-learn how DNS works and how could it be used in the process of a security assessment and network troubleshooting.

    ```{ .tldr}
    DNS enumeration tool.
    More information: https://manned.org/dnsrecon.

    - Scan a domain and save the results to an SQLite database:
    dnsrecon --domain example.com --db path/to/database.sqlite

    - Scan a domain, specifying the nameserver and performing a zone transfer:
    dnsrecon --domain example.com --name_server nameserver.example.com --type axfr

    - Scan a domain, using a brute-force attack and a dictionary of subdomains and hostnames:
    dnsrecon --domain example.com --dictionary path/to/dictionary.txt --type brt

    - Scan a domain, performing a reverse lookup of IP ranges from the SPF record and saving the results to a JSON file:
    dnsrecon --domain example.com -s --json

    - Scan a domain, performing a Google enumeration and saving the results to a CSV file:
    dnsrecon --domain example.com -g --csv

    - Scan a domain, performing DNS cache snooping:
    dnsrecon --domain example.com --type snoop --name_server nameserver.example.com --dictionary path/to/dictionary.txt

    - Scan a domain, performing zone walking:
    dnsrecon --domain example.com --type zonewalk
    ```

=== "LinPEAS"
    LinPEAS (Linux Privilege Escalation Awesome Script) is a highly popular, automated security auditing script designed to identify privilege escalation vectors on Linux, Unix, and macOS systems. Part of the PEASS-ng Repository, it is widely used in penetration testing and CTF (Capture The Flag) competitions.

     ???+ info "NO TLDR"
        This tool does not have a tldr, and not able to find the User Guide on Github or [linPEAS](https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS)
    

=== "Recon-ng"
    Recon-ng is a powerful, open-source web reconnaissance framework written in Python. Designed like the Metasploit framework, it automates Open Source Intelligence (OSINT) gathering to harvest domain names, email addresses, and subdomains. It features a built-in database, modular architecture, and API integrations for streamlined cybersecurity assessments.

    ```{ .tldr}
    recon-ng

    Automated reconnaissance and information gathering tool.
    More information: https://github.com/lanmaster53/recon-ng/wiki.

    - Start the tool in interactive mode:
    recon-ng

    - [Interactive] Create a workspace:
    workspaces create workspace_name

    - [Interactive] Search the marketplace for modules used to accomplish different reconnaissance tasks:
    marketplace search

    - [Interactive] Install all available modules (some may need API keys to function completely):
    marketplace install all

    - [Interactive] Load the profiler module. It is used to scan the web for profiles matching the target, scrape them, and store them:
    modules load profiler

    - [Interactive] Insert the target's username. After entering this command, enter the desired username of the search and leave the rest of the options blank:
    db insert profiles

    - [Interactive] Run the current module:
    run

    ```

