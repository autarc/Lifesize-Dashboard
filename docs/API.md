LifeSize API
============

Left side (bookmarks) showing the different entities.

- SysAdmin Class Documentation, 5p: SysAdmin provides system administration and network configuration services.
- Audio Class Documentation, 35p
- Camera Class Documentation, 47p: Provides control and configuration services for camera input devices.
- Comm Class Documentation, 68p | turned page format...


Endpoints:

SYNC getInfo, 307p



request current status of a connection


/rest/new                  / create new session
/rest/poll/<session-id>    / fast poll for events of a ssession
/rest/request/<session-id>
/longpoll.rb?session=<session-id>&timeout=<seconds>

longpoll -> if timeout omitted, default is 5seconds

// after 30sec of inactivty (no request/polling) - session is closed
