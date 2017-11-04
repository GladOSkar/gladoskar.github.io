#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <unistd.h>

#define MAX_QUOTE_LENGTH 1024
#define DEFAULT_SERVICE "qotd"
#define REFUSED_ERROR 111

// TODO: automatically check alternative port if default port failed
// TODO: use htons() & ntohs()

int main(int argc, char *argv[]) {

	if (argc < 2){
		printf("Usage: %s <node> [<port>]\n", argv[0]);
		exit(1);
	}

	// This resolves our hostnames & services. it also gets all other needed infos such as socktype and addr_len ny itself. wow.
	struct addrinfo* info;
	/* SET UP ADDRESS INFO */ {

		// tell getaddrinfo what we want
		struct addrinfo hints;
		memset(&hints, 0, sizeof(hints));	// Clear it first, because beej says so
		hints.ai_family = AF_UNSPEC;		// Let the kernel decide ip version by default
		hints.ai_socktype = SOCK_STREAM;	// We want a stream.

		// if we have a 2nd parameter, use it as port, otherwise use default port
		int info_status = getaddrinfo(argv[1],	// Host
									  argc > 2 ? argv[2] : DEFAULT_SERVICE,	// Port / Service
									  &hints, &info);
		if (info_status != 0) {
			fprintf(stderr, "Error while getting address info: %s\n", gai_strerror(info_status));
			exit(1);
		}

	}

	// This socket is where we are going to request the connection on
	int sock = socket(info->ai_family, info->ai_socktype, 0);
	if (sock == -1) {
		perror("Error while creating socket");
		freeaddrinfo(info);
		exit(1);
	}

	// Send out the request for a connection
	if (connect(sock, info->ai_addr, info->ai_addrlen) == -1) {
		perror("Error while connecting to host");
		if (errno == REFUSED_ERROR) printf("  The Host refused the connection.\n  Make sure the server is running and the firewall open.\n  Maybe he is listening on another IP version or port?\n  Try specifying the IP version for the server. \n");
		freeaddrinfo(info);
		close(sock);
		exit(1);
	}

	// We don't need this anymore
	freeaddrinfo(info);

	// wait for at least one line of data to come in
	char buffer[MAX_QUOTE_LENGTH] = "";
	int recv_len = recv(sock, &buffer, MAX_QUOTE_LENGTH, 0);

	// We don't need this anymore since all communication is done
	close(sock);

	if (recv_len == -1) {
		perror("Error while receiving data");
		exit(1);
	} else if (recv_len == 0) {
		perror("Error: Host closed the connection");
		exit(1);
	}

	printf("\n%s\n\n", buffer);
	return 0;
}
